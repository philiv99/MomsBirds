import React from 'react';
import PropTypes from 'prop-types';
import './Menus.less';

const MenuIcon = ({ open, setOpen }) => {
  return (
    <div className='menuicon' open={open} onClick={() => setOpen(!open)}>
      <i className="fa fa-bars"></i>
    </div>
  )
}

MenuIcon.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default MenuIcon;