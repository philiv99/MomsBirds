import React from 'react'
import PropTypes from 'prop-types'
import './SideBar.less';

class MapSideBar extends React.Component {
    
  constructor(props) {
    super(props);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.state = {collapsed: props.collapsed?props.collapsed:true};
  }

  collapseSliderIcon() {
    if (this.props.direction=="left") {
      $("#slidericon").removeClass('fa-angle-double-right');
      $("#slidericon").addClass('fa-angle-double-left');
    } else {
      $("#slidericon").removeClass('fa-angle-double-left');
      $("#slidericon").addClass('fa-angle-double-right');
    }
  }

  openSliderIcon() {
    if (this.props.direction=="left") {
      $("#slidericon").removeClass('fa-angle-double-left');
      $("#slidericon").addClass('fa-angle-double-right');
    } else {
      $("#slidericon").removeClass('fa-angle-double-right');
      $("#slidericon").addClass('fa-angle-double-left');
    }
  }

  toggleSidebar() {
    let isCollapsed = $(`#sidepanel${this.props.direction}`).hasClass('collapsed');
    $(`#sidepanel${this.props.direction}`).toggleClass('collapsed');
    var padding = {};
    if (isCollapsed) {
      this.collapseSliderIcon();
      padding[this.direction] = 300; 
    } else {
      this.openSliderIcon();
      padding[this.direction] = 0;
    }
    this.props.mapMgr.getMap().easeTo({
      padding: padding,
      duration: 1000 
    });
  }

  render() {
    
    return (
      <div id={`sidepanel${this.props.direction}`} className={`sidebar flex-center ${this.props.direction} collapsed`}>
        <div className="sidebar-content rounded-rect flex-center">
          {this.props.children}
          <div onClick={this.toggleSidebar} className={`sidebar-toggle rounded-rect ${this.props.direction}`}>
            <i id="slidericon" className="fa fa-angle-double-right" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    );
  }
}

MapSideBar.propTypes = {
  direction: PropTypes.string.isRequired,
  mapMgr: PropTypes.object.isRequired,
  collapsed: PropTypes.bool
};
export default MapSideBar;