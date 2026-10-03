import React from 'react';
import PropTypes from 'prop-types';
import './Menus.less';

const MenuIcon = ({ open, setOpen }) => {
  return (
    <button
      type="button"
      className="menuicon"
      aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={open}
      onClick={() => setOpen(!open)}
    >
      <span />
      <span />
      <span />
    </button>
  );
};

MenuIcon.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default MenuIcon;