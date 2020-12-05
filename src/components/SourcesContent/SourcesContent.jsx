import React from 'react';
import ImagesViewer from '../ImagesViewer/ImagesViewer.jsx';
import windowdemensions from "../../core/util/windowdemensions.js";
import './SourcesContent.less';

const images = [ { src: 'sources1.src' } ];

const SourcesContent = () => {

  const mapHeight = windowdemensions.getContentHeight();
  const sourcesContainerStyle = { height: `${mapHeight}px`, width: '100%'};
  return (
    <div className="SourcesContent" style={sourcesContainerStyle}>
      <p>Mom's Life List - click thmbnail to enlarge</p>
      <ImagesViewer />
    </div>
  );
}

export default SourcesContent;