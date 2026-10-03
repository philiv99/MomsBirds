import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './ItemListContent.less';

const BirdListItem = ({bird, mapFlyTo, editItem}) => {
  return <table>
            <tbody>
              <tr>
                <td >
                  <a  href="#" onClick={mapFlyTo} title="Zoom in to see marker details">
                    <span className="itemlink">
                        <i className="fa fa-map-marker"></i>
                    </span> 
                  </a>
                  <a  href="#" onClick={editItem} title="Show bird in edit panel">
                    <span className="itemlink">
                        <i className="fa fa-edit"></i>
                    </span> 
                  </a>
                </td>
                <td>
                  <span className="itemMomname">{bird.momname}</span>
                </td>
              </tr>
              <tr>
                <td valign="top" className="itemSightingMMMDD">
                  {moment(bird.sightingdate).format("MMM DD YYYY")}
                </td>
                <td align="left">
                  <span className="itemLocationDetails">{bird.address}</span>
                </td>
              </tr>
            </tbody>
          </table>;
}

BirdListItem.propTypes = {
  bird: PropTypes.object.isRequired,
  mapFlyTo: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired
};

export default BirdListItem