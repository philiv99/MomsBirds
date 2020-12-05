
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import itemMgr from "../../services/itemmanager.js";
import './BirdListContent.less';

const ItemListContent = (props) => {
  
  let itemRows = props.items.map((item)=> {
    let itemId = itemMgr.getBirdId(item);
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
      <div className="itemInfo">
        <table className="itemInfoTable">
          <tbody>
            {itemRows}
          </tbody>
        </table>
      </div> 
    </div>);
}

ItemListContent.propTypes = {
  header: PropTypes.element.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    mapFlyTo: (ItemId) => dispatch({ type: 'MAP_FLY_TO' }),
    fitBounds: () => dispatch({ type: 'MAP_FIT_BOUNDS' }),
    editBird: (ItemId) => { dispatch({ type: 'MAP_FLY_TO' }); dispatch({ type: 'EDIT_ITEM' }) }
  }
};

const mapStateToProps = state => {
  return {
    items: state.content.items.map(item => { return item.data})
  };
};

export const Container = connect(mapStateToProps, mapDispatchToProps)(ItemListContent);