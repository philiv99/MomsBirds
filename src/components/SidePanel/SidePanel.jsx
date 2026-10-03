import React from 'react';
import MapSideBar from '../SideBar/MapSideBar.jsx';
import SidePanelContent from './SidePanelContent.jsx';

const SidePanel = () => {

    return (
        <MapSideBar direction="left">    
            <SidePanelContent />
        </MapSideBar>
    );
  
}
  
export default SidePanel