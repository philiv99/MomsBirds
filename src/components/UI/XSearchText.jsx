
import React from 'react';
import PropTypes from 'prop-types';



class SearchText extends React.Component {
    
  constructor(props) {
    super(props);
  }

  componentDidMount() {    
    var input = document.getElementById(this.props.searchTextId);

    input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById(this.props.searchBtnId).click();
      }
    });
  }

  render() {
    return <span className="searchText">
                <span className="searchTextLabel">{this.props.SearchTextLabel}</span>
                <input id={this.props.searchTextId} type="text" name={this.props.searchTextId} ></input> 
                <a href="#" id={this.props.searchBtnId} onClick={this.onSearchClicked} ><i className="fa fa-search"></i></a>
            </span>;
  }
}


SearchText.propTypes = {
  SearchTextLabel: PropTypes.string,
  onSearchClicked: PropTypes.func,
  searchBtnId: PropTypes.string
};
  
export default SearchText;