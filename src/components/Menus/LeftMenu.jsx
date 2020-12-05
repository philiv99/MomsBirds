import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'underscore';
import './Menus.less';
import MenuIcon from './MenuIcon.jsx';
import Menu from './Menu.jsx';
import { setContentPageMap, setContentPageList} from '../../redux/actions/index.js';


const useOnClickOutside = (ref, handler) => {
  React.useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  },
  [ref, handler],
  );
};

const LeftMenu = ({ setContentPageMap, setContentPageList }) => {
  
  const node = React.useRef(); 
  useOnClickOutside(node, () => setOpen(false));  

  const [open, setOpen] = React.useState(false);
  const actions = [ 
    {
      icon: 'fa-map',
      callback: () => { setOpen(false); setContentPageMap(); },
      label: 'Show Map'
    },
    {
      icon: 'fa-picture-o',
      callback: () => { setOpen(false); setContentPageList(); },
      label: 'Show Sources'
    }
]

  return (
      <div ref={node}>
        <MenuIcon open={open} setOpen={setOpen} />
        <Menu  open={open} setOpen={setOpen} actions={actions} />
      </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setContentPageMap: () => dispatch(setContentPageMap()),
    setContentPageList: () => dispatch(setContentPageList())
  }
}

export default connect(null, mapDispatchToProps)(LeftMenu);