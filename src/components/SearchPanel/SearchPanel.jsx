import React from 'react';
import { connect } from 'react-redux';
import { searchByText, searchByYear, toggleAllYears } from '../../redux/actions/index.js';
import './SearchPanel.less';
import SearchText from "./SearchText.jsx";
import ShowAllCheckBox from "./ShowAllCheckBox.jsx";
import ContentEnums from '../../core/data/enums/contentEnums.js';
import TimeLineSlider from "../UI/TimeLineSlider/TimeLineSlider.jsx";

const SearchPanel = ({searchByText, searchByYear, toggleAllYears, isShowAllYears, minYear, maxYear, selectedYear, filters}) => {
    let searchText = "";
    if (filters && filters.length>0) {
        let searchTextFilter = filters.find((f) => { return f.name == ContentEnums.filters.BYSEARCHTEXT; })
        if (searchTextFilter)
          searchText = searchTextFilter.params.searchText;
    }
    return (
        <div className='searchpaneltop'>
            <div className="searchpanelcontrols">
                <ShowAllCheckBox isAllChecked={isShowAllYears} onChange={toggleAllYears}/>
                <SearchText searchFunction={searchByText} searchText={searchText}/>
            </div>
            <TimeLineSlider Start={minYear} 
                          End={maxYear} 
                          CurrentYear={selectedYear} 
                          showContentByYearOffset={searchByYear}/>
        </div>)
}

const mapDispatchToProps = dispatch => {
  return {
    searchByText: (text) => dispatch(searchByText(text)),
    searchByYear: (year) => dispatch(searchByYear(year)),
    toggleAllYears: () => dispatch(toggleAllYears())
  }
}

const mapStoreToProps = appState => ({
    minYear: appState.content.minYear,
    maxYear: appState.content.maxYear,
    selectedYear: appState.content.selectedYear,
    isShowAllYears: appState.content.isShowAllYears,
    filters: appState.content.filters
})

export default connect(mapStoreToProps, mapDispatchToProps)(SearchPanel)