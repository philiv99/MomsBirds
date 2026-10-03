
import React from 'react';
import './Marker.less';
import moment from 'moment';

const Marker = ({bird, id}) => {
    let sightingDate = moment(bird.sightingdate);
    return (
          <div id={id} className="markerContent">
            <div align='center'>
              <a className="markerName" href={bird.url} target='_new'>
                {bird.momname}<br/>
                <img src={bird.thumburl} width='150'/><br/>
              </a>
              {sightingDate.format("MMMM DD, YYYY")}<br/>
              {bird.address}<br/>
            </div>
          </div>
        )
}

export default Marker;