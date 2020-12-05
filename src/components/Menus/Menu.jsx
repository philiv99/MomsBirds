import React from 'react';
import PropTypes from 'prop-types';
import './Menus.less';



const Menu = ({ open, actions }) => {
  const openStyle = open ? {transform: 'translateX(0)'} : { transform:'translateX(-150%)'};

  const actionLinks =  actions.map((action, index) => {
    return <a key={`menuItem${index}`} href="#" onClick={action.callback} ><i className={`fa ${action.icon}`}></i><span className="leftspacer">{action.label}</span></a>
  })

  return (
    <div className='menu' style={openStyle} >
      {actionLinks}
    </div>
  )
}
Menu.propTypes = {
  open: PropTypes.bool.isRequired,
  actions: PropTypes.array.isRequired
};

export default Menu;