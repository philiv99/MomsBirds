

import React from 'react';
import windowdemensions from "../../core/util/windowdemensions.js";
import LifeListPage1 from '../../images/LifeListPage1.png';
import LifeListPage2 from '../../images/LifeListPage2.png';
import LifeListPage3 from '../../images/LifeListPage3.png';
import LifeListPage4 from '../../images/LifeListPage4.png';
import LifeListPage5 from '../../images/LifeListPage5.png';
import LifeListPage6 from '../../images/LifeListPage6.png';
import LifeListPage7 from '../../images/LifeListPage7.png';
import LifeListPage8 from '../../images/LifeListPage8.png';
import LifeListPage9 from '../../images/LifeListPage9.png';
import ImageWithModal from './ImageWithModal.jsx';
import './ImagesViewer.less';

function ImagesViewer() {
  const images = [
    LifeListPage1, LifeListPage2, LifeListPage3,
    LifeListPage4, LifeListPage5, LifeListPage6,
    LifeListPage7, LifeListPage8, LifeListPage9
  ];
 
  const mapHeight = windowdemensions.getContentHeight();
  const sourcesContainerStyle = { height: `${mapHeight}px`, width: '100%'};
  return (
      <div className="images-viewer-panels" style={sourcesContainerStyle}>
          { images.map((src, index) => {return <div className="images-viewer-panel" key={`imagekey${index}`} ><ImageWithModal imgSrc={src} /></div>}) }
    </div>
  );
}

export default ImagesViewer
 