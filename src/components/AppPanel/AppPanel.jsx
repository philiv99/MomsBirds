
import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import windowdemensions from "../../core/util/windowdemensions.js";
import Map from '../Map/Map.jsx';
import './AppPanel.less';
import SearchPanel from '../SearchPanel/SearchPanel.jsx';
import SidePanel from '../SidePanel/SidePanel.jsx';
const SourcesContent = lazy(() => import('../SourcesContent/SourcesContent.jsx'));
import ContentEnums from '../../core/data/enums/contentEnums.js';

const AppPanel = ({contentHeight, footerHeight, contentPage}) => {

  const appContentStyle = { }; //height: `${appContentHeight}px`};

  const content = contentPage == ContentEnums.contentPage.MAP?
                          <div className="appcontentdiv"  >
                            <SearchPanel />
                            <Map />
                          </div>:
                          <Suspense fallback={<div>Loading...</div>}>
                            <SourcesContent />
                          </Suspense>;

  return (
    <div className="apppanel" style={appContentStyle}>
      {content}
    </div>
  );
  
}

const mapStoreToProps = appState => ({
  contentHeight: appState.content.contentHeight,
  footerHeight: appState.content.footerHeight,
  contentPage: appState.content.contentPage
})
  
export default connect(mapStoreToProps)(AppPanel)
