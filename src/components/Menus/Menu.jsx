import React from 'react';
import PropTypes from 'prop-types';
import './Menus.less';

const Menu = ({ open, actions }) => {
  const openStyle = open
    ? { transform: 'translateX(0)', opacity: 1, pointerEvents: 'auto' }
    : { transform: 'translateX(-120%)', opacity: 0, pointerEvents: 'none' };

  const actionLinks = actions.map((action, index) => {
    return (
      <a
        key={`menuItem${index}`}
        href="#"
        role="menuitem"
        onClick={(event) => {
          event.preventDefault();
          action.callback();
        }}
      >
        <i className={`fa ${action.icon}`} aria-hidden="true" />
        <span className="leftspacer">{action.label}</span>
      </a>
    );
  });

  return (
    <div className="menu" style={openStyle} role="menu" aria-label="Main navigation">
      {actionLinks}
    </div>
  );
};

Menu.propTypes = {
  open: PropTypes.bool.isRequired,
  actions: PropTypes.array.isRequired,
};

export default Menu;