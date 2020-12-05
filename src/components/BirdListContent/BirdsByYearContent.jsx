
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import BirdListContent from './BirdListContent.jsx';
import birdMgr from "../../services/birdmanager.js";
import './BirdListContent.less';

const BirdsByYearContent = (props) => {
  let birds = [];
  let header = "";
  let birdPlural = "s";
  birds =  birdMgr?birdMgr.getBirdsByYearOffset(props.yearOffset):[];
  const currentYear = birdMgr.getSelectedYear(props.yearOffset);
  birdPlural = birds.length==1?"":"s";
  header = <p>{birds.length} bird{birdPlural} sighted in {currentYear}</p>;

  return (<BirdListContent birds={birds} header={header} editBird={props.editBird} fitBounds={props.fitBounds} mapFlyTo={props.mapFlyTo} />);
}

BirdsByYearContent.propTypes = {
  yearOffset: PropTypes.number.isRequired,
  mapFlyTo: PropTypes.func.isRequired,
  fitBounds: PropTypes.func.isRequired,
  editBird: PropTypes.func.isRequired
};

export default BirdsByYearContent;