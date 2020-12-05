import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SearchPanel.less'

const ShowAllCheckBox = ({isAllChecked, onChange}) => {
    
  const [isAllCheckedInput, setIsAllChecked] = useState(isAllChecked);
  const setter = set => e => {
    const value = e.target.checked;
    set(value);
    onChange();
  };
    return (
          <span className="allContentLabel">
          Show all years: 
         <input 
             className="allCheckBox" 
             id="allCheckBox"
             type="checkbox"
             value={isAllChecked}
             checked={isAllChecked}
             onChange={setter(setIsAllChecked)}
         />
      </span>)
}

ShowAllCheckBox.propTypes = {
    isAllChecked: PropTypes.bool,
    onChange: PropTypes.func
}
export default ShowAllCheckBox