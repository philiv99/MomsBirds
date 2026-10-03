
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'underscore';
import contentEnums from '../../core/data/enums/contentEnums.js';
import './ItemListContent.less';
import BirdListItem from './BirdListItem.jsx';
import { mapFlyTo, mapFitBounds, editItem } from '../../redux/actions/index.js';
  
const ItemListContent = ({items, filters, mapFlyTo, fitBounds, editItem}) => {
  let rows =<tr key="itemkey0"><td>No items to display</td></tr>;
  if (items && items.length>0) {
    rows = items.map((item) => { 
      if (item) {
        switch (item.type) {
          case contentEnums.types.BIRDSIGHTING:
            return <tr key={`itemkey${item.id}`}><td><BirdListItem bird={item.data} mapFlyTo={() => mapFlyTo(item.marker.id)} editItem={() => editItem(item.id)}/></td></tr>
          default:
            return <tr key="itemkey0"><td>Unknown content type {item.type}</td></tr>
        }
      }   
    });
  }
  let filterSummary = (filters.length>0)?filters.reduce((message, filter) => {
      switch(filter.name) {
        case contentEnums.filters.BYSEARCHTEXT: return message+' by text "'+filter.params.searchText+'"';
        case contentEnums.filters.BYYEAR: return message+' by year '+filter.params.searchYear;
      }
      return message;
  }, ""): "";
  let header =  <div className="itemInfoHeader">
    <div className="itemInfoHeaderText">
      {items.length} bird{items.length==1?'':'s'} {filterSummary}
    </div>
    <div className="itemInfoHeaderIcons">
      <a href="#" onClick={fitBounds} title="Zoom out to see all markers">
        <span className="itemlink">
          <i className="fa fa-globe"></i>
        </span> 
      </a>
    </div>
  </div>

  return (
  <div className="itemInfoContainer">
    {header}
    <div className="itemInfo">
      <table className="itemInfoTable">
        <tbody>
          {rows}
        </tbody>
      </table>
    </div> 
  </div>);
}

ItemListContent.propTypes = {
  header: PropTypes.string
};

const select = appState => ({
  items: appState.content.items,
  filters: appState.content.filters
})

const mapDispatchToProps = dispatch => {
  return {
    mapFlyTo: (markerid) => dispatch(mapFlyTo(markerid)),
    fitBounds: () => dispatch(mapFitBounds()),
    editItem: (itemId) => dispatch(editItem(itemId))
  }
}

export default connect(select, mapDispatchToProps)(ItemListContent)