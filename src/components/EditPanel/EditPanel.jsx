import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import windowdemensions from "../../core/util/windowdemensions.js";
import dragElement from "../../core/util/draggable.js";
import Tabs from '../Tabs/Tabs.jsx'
import contentEnums from '../../core/data/enums/contentEnums.js';
import "./EditPanel.less";



const EditPanel = ({displayOptions, editItems}) => {

  const [isCollapsed, setIsCollapsed] = React.useState(displayOptions.isCollapsed);

  const getPanelHeight = () => {
    const panelHeight = windowdemensions.getWindowHeight();
    return Math.floor(panelHeight-(panelHeight*displayOptions.panelHeightFactor));
  }

  const getPanelWidth = () => {
    const panelWidth = windowdemensions.getWindowWidth();
    return Math.floor(panelWidth-(panelWidth*displayOptions.panelWidthFactor));
  }

  const tabDisplayOptions = {
    height: getPanelHeight()-95,
    width: getPanelWidth()-10,
    overflow: 'auto'
  }

  const assembleContent = () => {
    let tabs = [];
    tabs.push({
        title: "Help",
        command: "Help",
        status: contentEnums.statuses.STATIC,
        selected: false,
        content: <div style={tabDisplayOptions}>Help text<br/><br/><br/>End Help text</div>
      });
      if (editItems && editItems.length>0)
      {
        editItems.map((editItem) => {
          tabs.push(editItem.tab);
        })
      }
    return tabs;
  }

  const renderMic = () => {
    return <div title="Click mic to start listening">
              <a href="#"><i id="microphoneIcon" className={`fa fa-microphone speaker-mic-off`}></i></a>
            </div>;
  }

  let panelStyle = { 
    top: displayOptions.panelTop, 
    left: displayOptions.panelLeft,
    width: getPanelWidth(),
    height: isCollapsed?displayOptions.panelHeaderHeight:getPanelHeight()
  }

  let panelTextStyle = {
    display: isCollapsed?'none':'block',
    height: getPanelHeight()
  }

  let microphone = renderMic();
  let panelContent =<Tabs tabInfo={assembleContent()}/>;
  let chevronIcon = isCollapsed?'fa-chevron-down':'fa-chevron-up';
  let chevronTitle = isCollapsed?'Click to open edit panel':'Click to close edit panel';

  let toggleIsCollapsed = () => { setIsCollapsed(!isCollapsed) };

  return (
    <div style={panelStyle} id="speakerpanel" className="speakerpanel display-block" ref={dragElement}>
      <div id="speakerpanelheader" className="speaker-header">
            <div className="speaker-mic">
                {microphone}
            </div>
            <div className="speaker-buttons">
                <button onClick={toggleIsCollapsed} title={chevronTitle}><i className={`fa ${chevronIcon}`} ></i></button>
            </div>
            <div className="speaker-text">
                {displayOptions.panelHeaderText}
            </div>
      </div>
      <div className="speaker-content" style={panelTextStyle}>
          <div>
              {panelContent}
          </div>
      </div>
    </div>
  );
}

EditPanel.propTypes = {
  displayOptions: PropTypes.object
};

const mapStoreToProps = appState => ({
  editItems: appState.content.editItems
})
  
export default connect(mapStoreToProps)(EditPanel)