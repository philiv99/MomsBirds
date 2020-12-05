import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import windowdemensions from "../../core/util/windowdemensions.js";
import mapMgr from "../../services/mapmanager.js";
import MapSideBar from '../SideBar/MapSideBar.jsx';
import ItemListContent from '../SidebarContent/ItemListContent.jsx';
import './Map.less';

let mapStyle = {
    marginLeft: "5px",
    marginRight: "5px",
    transition: "all 0.3s",
    borderColor: "rgb(177, 231, 252)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "5px",
    width: "98.5%",
    height: "90%"
  }

const Map = ({markers}) => {

  const mapHeight = windowdemensions.getContentHeight();
  const contentHeight = Math.floor(mapHeight-(mapHeight/10));
  const mapContainerStyle = { height: `${contentHeight}px`, width: '100%'};
  let mapContainer = React.createRef();
  
  useEffect(() => {
    if (mapMgr.getMap()) 
    {
      if (mapContainer) mapMgr.create(mapContainer.current);
      return;
    }
    if (mapContainer) mapMgr.create(mapContainer.current);
  });

  useEffect(() => {
    if (markers) {
      mapMgr.removeMarkers();
      mapMgr.addMarkers(markers);
    }
  }, [markers]);

  return (
        <div style={mapContainerStyle}>
          <div className="mapDiv"  style={mapStyle} ref={mapContainer} >
            <MapSideBar direction="left" mapMgr={mapMgr}>
              <ItemListContent />
            </MapSideBar>
          </div>
          <div id="newMarkerElement"></div>
        </div>
      );
}

const select = appState => ({
  markers: (appState.content.items && appState.content.items.length>0)?appState.content.items.map((item) => { return item.marker}):[]
})

export default connect(select)(Map)
