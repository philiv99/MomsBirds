
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { mapFlyTo, mapFitBounds, editItem } from '../../redux/actions/index.js';
import './BirdListContent.less';

const BirdListContent = ({header, items, mapFlyTo, mapFitBounds, editItem}) => {
  
  let birdRows = items.map((item)=> {
    let birdId = item.data.id;
    let flyTo = function() { 
      mapFlyTo(item); 
    };
    let editBird = function () {
      mapFlyTo(item); 
      editItem(item);
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
                        <span className="birdMomname">{item.data.momname}</span>
                      </td>
                    </tr>
                    <tr>
                      <td valign="top"className="birdSightingMMMDD">
                        {moment(item.data.sightingdate).format("MMM DD YYYY")}
                      </td>
                      <td align="left">
                        <span className="birdLocationDetails">{item.data.address}</span>
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
          {header}
        </div>
        <div className="birdHeaderIcons">
          <a href="#" onClick={mapFitBounds} title="Zoom out to see all markers">
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

const mapDispatchToProps = dispatch => {
  return {
    mapFlyTo: (item) => dispatch(mapFlyTo(item)),
    mapFitBounds: () => dispatch(mapFitBounds()),
    editItem: (itemId) => dispatch(editItem(itemId))
  }
}

const mapStoreToProps = appState => ({
  items: appState.content.items
})

export default connect(mapStoreToProps, mapDispatchToProps)(BirdListContent)