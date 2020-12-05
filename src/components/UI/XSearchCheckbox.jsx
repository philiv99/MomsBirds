
import React from 'react';
import PropTypes from 'prop-types';

class XSearchAllCheckbox extends React.Component {
    
  constructor(props) {
    super(props);
  }

  render() {
    return <span className="searchCheckbox">
                 <span className="checkboxLabel">{this.props.CheckBoxLabel}</span>
                <input 
                    className="checkboxInput" 
                    id={this.props.inputId}
                    type="checkbox"
                    value={this.props.isChecked}
                    checked={this.props.isChecked}
                    onChange={this.props.onChangeAllCheckbox}
                />
            </span>;
  }
}

XSearchAllCheckbox.propTypes = {
    CheckBoxLabel: PropTypes.string,
    isChecked: PropTypes.bool,
    onCheckBoxChange: PropTypes.func,
    inputId: PropTypes.string
};
  
export default XSearchAllCheckbox;