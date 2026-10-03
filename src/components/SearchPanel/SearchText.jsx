
import React, { useState, useCallback } from "react";
import PropTypes from 'prop-types';
import _ from "lodash";

import './SearchPanel.less'
const sendQuery = query => console.log(`Querying for ${query}`);

const SearchText = ({searchFunction, searchText}) => {

  const [search, setSearch] = useState(searchText);
  
  const delayedSearchFunction = useCallback(_.debounce(q => searchFunction(q), 500), []);
  const onChange = e => {
    setSearch(e.target.value);
    delayedSearchFunction(e.target.value);
  };

  return (
        <div>
            <span className="searchLabel">Search by name or location:</span> 
            <input id="searchText" type="text" name="searchText"  onChange={onChange} value={search}></input> 
        </div>
  );
};

SearchText.propTypes = {
    searchFunction: PropTypes.func.isRequired,
    searchText: PropTypes.string
}
export default SearchText
