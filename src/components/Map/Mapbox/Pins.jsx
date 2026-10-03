import * as React from 'react';
import moment from 'moment';
import 'mapbox-gl/dist/mapbox-gl.css';
import {PureComponent} from 'react';
import { Popup, Marker } from 'react-mapbox-gl';
import './mapbox.less';
import mapMgr from "../../../services/mapmanager.js";
import { connect } from 'react-redux';
import { updateBirdLocation } from "../../../redux/actions/index.js";

function getItemCoordinates(item) {
  const marker = item && item.marker ? item.marker : {};
  const data = item && item.data ? item.data : {};
  const markerLng = marker.lng;
  const markerLat = marker.lat;
  const dataLng = data.lng;
  const dataLat = data.lat;
  const dataSightingLng = data.sightinglng;
  const dataSightingLat = data.sightinglat;
  const lngSource = markerLng != null ? markerLng : (dataLng != null ? dataLng : dataSightingLng);
  const latSource = markerLat != null ? markerLat : (dataLat != null ? dataLat : dataSightingLat);
  const lng = Number(lngSource);
  const lat = Number(latSource);
  if (!Number.isFinite(lng) || !Number.isFinite(lat)) {
    return null;
  }
  return { lng, lat };
}

function getSelectedItem(item) {
  if (!item || !item.data) {
    return null;
  }
  const coords = getItemCoordinates(item);
  if (!coords) {
    return null;
  }
  return { ...item.data, ...coords };
}


const ItemPopupContent = (props) => {
  const item = props.item;
  let sightingDate = moment(item.sightingdate);
  return (
        <div id={'item'+item.id} className="markerContent">
          <button
            type="button"
            className="popup-close-btn"
            aria-label="Close"
            onClick={props.onClose}
          >
            &times;
          </button>
          <div align='center'>
            <a className="markerName" href={item.url} target='_new'>
              {item.momname}<br/>
              <img src={item.thumburl} width='150'/><br/>
            </a>
            {sightingDate.format("MMMM DD, YYYY")}<br/>
            {item.address}<br/>
          </div>
        </div>
      )
}

const ConfirmationPopup = (props) => {
  const { bird, newPosition, onConfirm, onCancel } = props;
  return (
    <div className="confirmation-popup">
      <button
        type="button"
        className="popup-close-btn"
        aria-label="Close"
        onClick={onCancel}
      >
        &times;
      </button>
      <h4>Update Bird Location</h4>
      <p>Do you want to move "{bird.momname}" to this new location?</p>
      <div className="confirmation-buttons">
        <button onClick={onConfirm} className="confirm-btn">Update</button>
        <button onClick={onCancel} className="cancel-btn">Cancel</button>
      </div>
    </div>
  );
}

class Pins extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      draggedItem: null,
      draggedPosition: null,
      showConfirmation: false
    }

    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.confirmLocationUpdate = this.confirmLocationUpdate.bind(this);
    this.cancelLocationUpdate = this.cancelLocationUpdate.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
  }

  componentDidMount() {
    this.fitToData();
  }

  componentDidUpdate(previousProps, previousState) {
    // Left-panel bird click: fly + open popup. A sequence number guarantees this
    // fires even when the same bird is clicked again.
    if (this.props.mapFlyToSeq !== previousProps.mapFlyToSeq && this.props.selectedBirdOnMapId) {
      const selected = (this.props.data || []).find(item => item.data && item.data.id === this.props.selectedBirdOnMapId);
      if (selected) {
        this.setState({ selectedItem: getSelectedItem(selected), showConfirmation: false });
      }
      return;
    }

    // Data/filter change (search text or year toggle): fit bounds to the
    // currently selected group of birds.
    if (previousProps.data !== this.props.data) {
      // Drop the open popup if its bird is no longer in the filtered results.
      if (this.state.selectedItem) {
        const stillExists = (this.props.data || []).find(item => item.data && item.data.id === this.state.selectedItem.id);
        if (!stillExists) {
          this.setState({ selectedItem: null });
        }
      }
      this.fitToData();
    }
  }

  fitToData() {
    const markers = (this.props.data || [])
      .map((item) => getItemCoordinates(item))
      .filter((coords) => coords)
      .map((coords) => ({ lat: coords.lat, lng: coords.lng }));
    mapMgr.fitAndZoomPinBounds(markers);
  }

  handleMarkerClick(item) {
    const selectedItem = getSelectedItem(item);
    mapMgr.flyToItem(item);
    this.setState({
      selectedItem: selectedItem,
      showConfirmation: false
    });
  }

  handleDragEnd(item, { lng, lat }) {
    this.setState({
      draggedItem: item.data,
      draggedPosition: { lng, lat },
      selectedItem: null,
      showConfirmation: true
    });
  }

  confirmLocationUpdate() {
    const { draggedItem, draggedPosition } = this.state;
    if (!draggedItem || !draggedPosition) return;

    // Create updated bird object
    const updatedBird = {
      ...draggedItem,
      sightinglat: draggedPosition.lat,
      sightinglng: draggedPosition.lng,
      lat: draggedPosition.lat,
      lng: draggedPosition.lng
    };

    // Dispatch the update action
    this.props.updateBirdLocation(draggedItem.id, updatedBird);
    
    // Reset state
    this.setState({ 
      showConfirmation: false,
      draggedItem: null,
      draggedPosition: null
    });
  }

  cancelLocationUpdate() {
    this.setState({ 
      showConfirmation: false,
      draggedItem: null,
      draggedPosition: null
    });
  }

  render() {
    const { data } = this.props;
    const { selectedItem, draggedItem, draggedPosition, showConfirmation } = this.state;
    const renderableItems = (data || []).filter((item) => getItemCoordinates(item));

    // Normal popup for selected item
    const itemPopup = selectedItem && !showConfirmation && Number.isFinite(selectedItem.lng) && Number.isFinite(selectedItem.lat) ? (
      <Popup 
        coordinates={[selectedItem.lng, selectedItem.lat]}
        anchor="bottom"
        offset={[0, -46]}
      >
        <ItemPopupContent 
          item={selectedItem} 
          onClose={() => this.setState({ selectedItem: null })}
        />
      </Popup>
    ) : null;

    // Confirmation popup when marker is dragged
    const confirmationPopup = showConfirmation && draggedItem && draggedPosition ? (
      <Popup 
        coordinates={[draggedPosition.lng, draggedPosition.lat]}
        anchor="bottom"
        offset={[0, -46]}
      >
        <ConfirmationPopup 
          bird={draggedItem}
          newPosition={draggedPosition}
          onConfirm={this.confirmLocationUpdate}
          onCancel={this.cancelLocationUpdate}
        />
      </Popup>
    ) : null;

    return (
      <>
        {renderableItems.map((item) => {
          const coordinates = getItemCoordinates(item);
          return (
            <Marker
              key={'pin-' + item.id}
              coordinates={[coordinates.lng, coordinates.lat]}
              anchor="bottom"
              draggable={true}
              onClick={() => this.handleMarkerClick(item)}
              onDragEnd={(pos) => this.handleDragEnd(item, pos)}
            >
              <div className="default-marker"></div>
            </Marker>
          );
        })}
        {itemPopup}
        {confirmationPopup}
      </>
    );
  }
}

const mapDispatchToProps = {
  updateBirdLocation
};

const mapStoreToProps = appState => ({
  selectedBirdOnMapId: appState.content.selectedBirdOnMapId,
  mapFlyToSeq: appState.content.mapFlyToSeq
});

export default connect(mapStoreToProps, mapDispatchToProps)(Pins);
