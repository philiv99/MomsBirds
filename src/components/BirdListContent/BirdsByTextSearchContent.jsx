
import React from 'react';
import PropTypes from 'prop-types';
import BirdListContent from './BirdListContent.jsx';
import birdMgr from "../../services/birdmanager.js";
import './BirdListContent.less';

const BirdsByTextSearchContent = (props) => {
  let birds = [];
  let header = "";
  let birdPlural = "s";
  if (props.searchText && props.searchText != "") {
    birds =  birdMgr?birdMgr.getBirdsBySearchText(props.searchText):[];
    birdPlural = birds.length==1?"":"s";
  }
  header = <p>{birds.length} bird{birdPlural} matching {props.searchText}</p>

  return (<BirdListContent birds={birds} header={header} editBird={props.editBird} fitBounds={props.fitBounds} mapFlyTo={props.mapFlyTo} birdMgr={birdMgr}/>);
}

BirdsByTextSearchContent.propTypes = {
  searchText: PropTypes.string,
  mapFlyTo: PropTypes.func.isRequired,
  fitBounds: PropTypes.func.isRequired,
  editBird: PropTypes.func.isRequired
};

export default BirdsByTextSearchContent;