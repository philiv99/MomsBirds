import React from 'react';
import { connect } from 'react-redux';
import BirdListContent from './BirdListContent.jsx';
import './BirdListContent.less';

const AllBirdsContent = ({items}) => {
  var header = `All ${items.length} birds`;
  return (<BirdListContent header={header} />);
}

const mapStoreToProps = appState => ({
  items: appState.content.items
})

export default connect(mapStoreToProps)(AllBirdsContent)