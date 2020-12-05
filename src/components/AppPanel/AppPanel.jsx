
import React from 'react';
import { connect } from 'react-redux';
import Map from '../Map/Map.jsx';
import './AppPanel.less';
import SearchPanel from '../SearchPanel/SearchPanel.jsx';
import SourcesContent from '../SourcesContent/SourcesContent.jsx';
import EditPanel from '../EditPanel/EditPanel.jsx'
import ContentEnums from '../../core/data/enums/contentEnums.js';

const AppPanel = ({contentPage}) => {

  const speakerDisplayOptions =  {
    panelHeaderText: "Edit Panel",
    panelTop: 9,
    panelLeft: 75,
    isCollapsed: true,
    panelHeaderHeight: 40,
    panelHeightFactor: 0.5,
    panelWidthFactor: 0.65
  }
  const content = contentPage == ContentEnums.contentPage.MAP?
                          <div>
                            <EditPanel displayOptions={speakerDisplayOptions} />
                            <SearchPanel />
                            <Map />
                          </div>:
                          <SourcesContent />;

  return (
    <div className="apppanel">
      {content}
    </div>
  );
}

const mapStoreToProps = appState => ({
  contentPage: appState.content.contentPage
})
  
export default connect(mapStoreToProps)(AppPanel)
