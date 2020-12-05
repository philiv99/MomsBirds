
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import birdMgr from "../../services/birdmanager.js";
import './BirdListContent.less';

const BirdListContent = (props) => {
  
  let birdRows = props.birds.map((bird)=> {
    let birdId = birdMgr.getBirdId(bird);
    let flyTo = function() { 
      props.mapFlyTo(birdId); 
    };
    let editBird = function () {
      props.mapFlyTo(birdId); 
      props.editBird(bird);
    }
    return <tr key={birdId}>
            <td>
                <table>
                  <tbody>
                    <tr>
                      <td >
                        <a  href="#" onClick={flyTo} title="Zoom in to see marker details">
                          <span className="birdlink">
                              <i className="fa fa-map-marker"></i>
                          </span> 
                        </a>
                        <a  href="#" onClick={editBird} title="Show bird in edit panel">
                          <span className="birdlink">
                              <i className="fa fa-edit"></i>
                          </span> 
                        </a>
                      </td>
                      <td>
                        <span className="birdMomname">{bird.momname}</span>
                      </td>
                    </tr>
                    <tr>
                      <td valign="top"className="birdSightingMMMDD">
                        {moment(bird.sightingdate).format("MMM DD YYYY")}
                      </td>
                      <td align="left">
                        <span className="birdLocationDetails">{bird.address}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
            </td>
          </tr>;
  })

  return (
    <div className="birdInfoContainer">
      <div className="birdInfoHeader">
        <div className="headerText">
          {props.header}
        </div>
        <div className="birdHeaderIcons">
          <a href="#" onClick={props.fitBounds} title="Zoom out to see all markers">
            <span className="birdlink">
              <i className="fa fa-globe"></i>
            </span> 
          </a>
        </div>
      </div>
      <div className="birdInfo">
        <table className="birdInfoTable">
          <tbody>
            {birdRows}
          </tbody>
        </table>
      </div> 
    </div>);
}

BirdListContent.propTypes = {
  header: PropTypes.element.isRequired,
  mapFlyTo: PropTypes.func.isRequired,
  fitBounds: PropTypes.func.isRequired,
  editBird: PropTypes.func.isRequired,
  birds: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default BirdListContent;