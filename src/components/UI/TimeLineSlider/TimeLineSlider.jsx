import React from "react";
import _ from 'underscore';
import PropTypes from 'prop-types'
import 'jquery-ui/ui/widgets/slider';
import "./TimeLineSlider.less";

const sliderStyle = {
  position: "relative",
  width: "100%"
};

class TimeLineSlider extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let myThis = this;
        let yearCount = this.props.End-this.props.Start;
        $( "#dateSlider" ).slider({
            min: this.props.Start,
            max: this.props.End,
            slide: function( event, ui ) {   
                myThis.props.showContentByYearOffset(ui.value);
            },
            create: function(event, ui){
                $(this).slider('value',myThis.props.CurrentYear);
            }
        });
    }

    render() {
        const displaySliderStyle = this.props.End == 0?{display: "none"}:{display:"block"};
        let sliderHandleStyle = { left: "45%", width: "33px", border: "1px solid #c5c5c5" };
        let dateSliderStyle = {height: 10, marginLeft: "3%", marginBottom: "5px", width: "95%" };
        return (
            <div className="TimeLineSliderPanel"  style={displaySliderStyle} >
                <div id="dateSlider" style={dateSliderStyle} className="dateSlider">
                    <div id="custom-handle" className="ui-slider-handle ui-corner-all ui-state-default" tabIndex="0" style={sliderHandleStyle}>
                        {this.props.CurrentYear}
                    </div>
                </div>
               
                <div className="SliderLabelFooter">
                    <div className="startdate" >{this.props.Start}</div>   
                    <div className="enddate" >{this.props.End}</div>
                </div>
            </div>
        );
    }
}

TimeLineSlider.propTypes = {
    Start: PropTypes.number.isRequired,
    End: PropTypes.number.isRequired,
    CurrentYear: PropTypes.number,
    showContentByYearOffset: PropTypes.func.isRequired,
};
  
  export default TimeLineSlider;