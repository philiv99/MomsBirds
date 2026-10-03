import React from 'react';
import birdMgr from '../../services/birdmanager.js';
import BirdsByYearContent from '../BirdListContent/BirdsByYearContent.jsx';
import BirdsByTextSearchContent from '../BirdListContent/BirdsByTextSearchContent.jsx';
import AllBirdsContent from '../BirdListContent/AllBirdsContent.jsx';
import contentEnums from  '../../core/data/enums/contentEnums.js' 


const SidePanelContent = () => {
    
    const editBird = () => { alert("Editing bird") };
    const fitBounds = () => { alert("fitBounds") };
    const mapFlyTo = () => { alert("mapFlyTo") };
    const searchText = "Search text";
    const yearOffset = 10;
    const contentComponentName = contentEnums.componentNames.AllBirdsComponent;
    var content = <div>No content set yet...</div>

    switch (contentComponentName) {
        case contentEnums.componentNames.BirdsByTextSearchComponent: 
          content =  <BirdsByTextSearchContent editBird={editBird} fitBounds={fitBounds} searchText={searchText} mapFlyTo={mapFlyTo}  birdMgr={birdMgr}/>; 
          break;
        case contentEnums.componentNames.BirdsByYearComponent: 
          content =  <BirdsByYearContent editBird={editBird} fitBounds={fitBounds}  yearOffset={yearOffset}  mapFlyTo={mapFlyTo}  birdMgr={birdMgr}/>; 
          break;
        case contentEnums.componentNames.AllBirdsComponent: 
          content =  <AllBirdsContent editBird={editBird} fitBounds={fitBounds} mapFlyTo={mapFlyTo}  birdMgr={birdMgr}/>; 
          break;
        default: 
            content =  <BirdsByYearContent editBird={editBird} fitBounds={fitBounds}  yearOffset={yearOffset}  mapFlyTo={mapFlyTo}  birdMgr={birdMgr}/>; 
            break;
      }

    return content;
}

export default SidePanelContent;