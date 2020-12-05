
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import BirdListContent from './BirdListContent.jsx';
import './BirdListContent.less';

const AllBirdsContent = (props) => {
  let birds = props.birdMgr.getBirds();
  let header = <p>All {birds.length} Birds</p>;

  return (<BirdListContent birds={birds} header={header} editBird={props.editBird} fitBounds={props.fitBounds} mapFlyTo={props.mapFlyTo} birdMgr={props.birdMgr}/>);
}

AllBirdsContent.propTypes = {
  mapFlyTo: PropTypes.func.isRequired,
  fitBounds: PropTypes.func.isRequired,
  editBird: PropTypes.func.isRequired,
  birdMgr: PropTypes.object.isRequired
};

export default AllBirdsContent;