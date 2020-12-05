
import React from 'react';
import PropTypes from 'prop-types';

import windowdemensions from "../../core/util/windowdemensions.js";
import mapMgr from "../../services/mapmanager.js";
import TimeLineSlider from "../UI/TimeLineSlider/TimeLineSlider.jsx";
import MapSideBar from '../SideBar/MapSideBar.jsx';
import BirdsByYearContent from '../BirdListContent/BirdsByYearContent.jsx';
import BirdsByTextSearchContent from '../BirdListContent/BirdsByTextSearchContent.jsx';
import AllBirdsContent from '../BirdListContent/AllBirdsContent.jsx';
import contentEnums from  '../../core/data/enums/contentEnums.js' 

import EditPanel from '../EditPanel/EditPanel.jsx'
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


class Map extends React.Component {
    
  constructor(props) {
    super(props);

    this.birdMgr = props.birdMgr;
    this.updateMapHeight = this.updateMapHeight.bind(this);
    this.showBirdsByYearOffset = this.showBirdsByYearOffset.bind(this);
    this.searchBirdData = this.searchBirdData.bind(this);
    this.mapFlyTo = this.mapFlyTo.bind(this);
    this.fitBounds = this.fitBounds.bind(this);
    this.editBird = this.editBird.bind(this);
    this.onChangeAllCheckbox = this.onChangeAllCheckbox.bind(this);
    this.state = {
      yearOffset:-1, 
      mapHeight:this.getMapHeight(), 
      searchText: "", 
      contentComponentName: contentEnums.contentComponents.BirdsByYearComponent,
      isAllChecked: false,
      birdsBeingEdited: []
    };
  }

  componentDidMount() {
    mapMgr.create(this.mapContainer);
    this.showBirdsByYearOffset(this.state.yearOffset);
    
    var input = document.getElementById("searchText");

    input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("searchBtn").click();
      }
    });
  }

  showBirdsByYearOffset(yearOffset) {
    if (mapMgr.isMapInitialized()) {
        if (yearOffset !== this.state.yearOffset) {
            mapMgr.removeMarkers();
            mapMgr.addMarkers(this.birdMgr.getMarkerOptionsByYearOffset(yearOffset));
            this.setState({ 
              yearOffset: yearOffset, 
              searchText: "", 
              contentComponentName: contentEnums.contentComponents.BirdsByYearComponent, 
              isAllChecked: false})
        }
    }
  }

  updateMapHeight() {
    const mapHeight = this.getContentHeight();
    this.setState({mapHeight: mapHeight});
  }

  getMapHeight() {
    const mapHeight = windowdemensions.getContentHeight();
    return Math.floor(mapHeight-(mapHeight/10));
  }

  mapFlyTo(id) {
      mapMgr.flyToMarkerId(id);
  }

  fitBounds() {
    mapMgr.fitBounds();
  }
  
  editBird(bird) {
    let tempBirdsBeingEdited = this.state.birdsBeingEdited;
    tempBirdsBeingEdited.push(bird);
    this.setState({birdsBeingEdited: tempBirdsBeingEdited});
  }

  endEditBird(bird) {
    
  }

  searchBirdData() {
    if (mapMgr.isMapInitialized()) {
        let searchText = $('#searchText').val();
        if (searchText) {
            mapMgr.removeMarkers();
            mapMgr.addMarkers(this.birdMgr.getMarkerOptionsBySearchText(searchText));
            this.setState({ 
              searchText: searchText, 
              contentComponentName: contentEnums.contentComponents.BirdsByTextSearchComponent, 
              isAllChecked: false
            })
        }
    }
  }

  getContentComponent() {
    switch (this.state.contentComponentName) {
      case contentEnums.contentComponents.BirdsByTextSearchComponent: 
        return <BirdsByTextSearchContent editBird={this.editBird} fitBounds={this.fitBounds} searchText={this.state.searchText} mapFlyTo={this.mapFlyTo}  birdMgr={this.birdMgr}/>; 
      case contentEnums.contentComponents.BirdsByYearComponent: 
        return <BirdsByYearContent editBird={this.editBird} fitBounds={this.fitBounds} yearOffset={this.state.yearOffset} mapFlyTo={this.mapFlyTo}  birdMgr={this.birdMgr}/>;
      case contentEnums.contentComponents.AllBirdsComponent: 
        return <AllBirdsContent editBird={this.editBird} fitBounds={this.fitBounds} mapFlyTo={this.mapFlyTo}  birdMgr={this.birdMgr}/>; 
      default: 
        return <BirdsByYearContent editBird={this.editBird} fitBounds={this.fitBounds} yearOffset={this.state.yearOffset}mapFlyTo={this.mapFlyTo}  birdMgr={this.birdMgr}/>;
    }
  }

  onChangeAllCheckbox(event) {
    if (event.target.checked) {
      if (mapMgr.isMapInitialized()) {
          mapMgr.removeMarkers();
          mapMgr.addMarkers(this.birdMgr.getAllMarkerOptions());
          
      }
      this.setState({
        yearOffset:-1, 
        searchText: "", 
        contentComponentName: contentEnums.contentComponents.AllBirdsComponent,
        isAllChecked: true
      });
    } else {
      this.setState({
        isAllChecked: false
      });
    }
  }

  render() {
    const speakerDisplayOptions =  {
      sizeFactor: .5,
      panelTop: 9,
      panelLeft: 75
    }
    const content = this.getContentComponent();
    const mapContainerStyle = { height: `${this.state.mapHeight}px`, width: '100%'};
    const currentYear = this.state.yearOffset == -1?this.birdMgr.getMinyear():parseInt(this.birdMgr.getMinyear())+parseInt(this.state.yearOffset);
    return (
        <div className="contentPanel">
          <div className="mapcontrols">
            <span className="allBirdsLabel">
                Show all birds: 
               <input 
                   className="allCheckBox" 
                   id="allCheckBox"
                   type="checkbox"
                   value={this.state.isAllChecked}
                   checked={this.state.isAllChecked}
                   onChange={this.onChangeAllCheckbox}
               />
            </span> 
            <span className="searchLabel">Search bird name or location:</span> 
            <input id="searchText" type="text" name="searchText" ></input> 
            <a href="#" id="searchBtn" onClick={this.searchBirdData} ><i className="fa fa-search"></i></a>
            <TimeLineSlider Start={this.birdMgr.getMinyear()} 
                            End={this.birdMgr.getMaxyear()} 
                            CurrentYear={currentYear} 
                            showContentByYearOffset={this.showBirdsByYearOffset}/>
          </div>
          <div style={mapContainerStyle}>
            <div  className="mapDiv"  style={mapStyle} ref={el => this.mapContainer = el} >
                <MapSideBar direction="left" mapMgr={mapMgr}>
                  {content}
                </MapSideBar>
            </div>
            <EditPanel displayOptions={speakerDisplayOptions} content={this.state.birdsBeingEdited}/>
          </div>
          <div id="newMarkerElement"></div>
        </div>
        )
    }
}

Map.propTypes = {
  birdMgr: PropTypes.object.isRequired
};

export default Map;