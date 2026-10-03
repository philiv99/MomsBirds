import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'; 
import _ from 'underscore';
import 'jquery-ui/ui/widgets/datepicker';

import birdMgr from '../../services/birdmanager.js'

import './BirdCard.less';

class Birds extends React.Component {
    
  constructor(props) {
    super(props);
    
    this.handleSave = this.handleSave.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.makeId = this.makeId.bind(this);
    this.makeSelector = this.makeSelector.bind(this);
    this.state = {bird: props.bird}
  }

  makeId(fieldName) {
    return `${fieldName}${this.props.cardId}`
  }

  makeSelector(fieldName) {
    let selectorId = this.makeId(fieldName);
    return `#${selectorId}`
  }

  componentDidMount() {
    let selectorId = this.makeSelector("sightingDatePicker");
    $( function() {
      $(selectorId).datepicker({
        changeMonth: true,
        changeYear: true
      });
    });
  }

  inputChange(e) {
    //do nothing for now
  }

  handleSave(e) {
    e.preventDefault();
    var sightingdate =  $(this.makeSelector("sightingDatePicker")).val();
    let updatedBird = {
      id           : $(this.makeSelector("birdId")).val(),
      momname           : $(this.makeSelector("momname")).val(),
      url               : $(this.makeSelector("url")).val(),
      imageurl          : $(this.makeSelector("imageurl")).val(),
      thumburl          : $(this.makeSelector("thumburl")).val(),
      address           : $(this.makeSelector("address")).val(),
      lat               : parseFloat($(this.makeSelector("lat")).val()),
      lng               : parseFloat($(this.makeSelector("lng")).val()),
      sightinglat       : parseFloat($(this.makeSelector("lat")).val()),
      sightinglng       : parseFloat($(this.makeSelector("lng")).val()),
      sightingdate      : sightingdate,
      sightingdatearray : sightingdate.split('/'),
    }
    birdMgr.updateBird(updatedBird);
    birdMgr.persistBird(updatedBird);
    this.setState({bird: updatedBird})
  }

  setFormValues(bird) { 
    $(this.makeSelector("birdId")).val(bird.id);
    $(this.makeSelector("momname")).val(bird.momname);
    $(this.makeSelector("url")).val(bird.url);
    $(this.makeSelector("imageurl")).val(bird.imageurl);
    $(this.makeSelector("thumburl")).val(bird.thumburl);
    $(this.makeSelector("address")).val(bird.address);
    $(this.makeSelector("lat")).val(bird.lat);
    $(this.makeSelector("lng")).val(bird.lng);
    $(this.makeSelector("sightingDatePicker")).val(bird.sightingdate);
  }

  openWikipediaPage() {
    window.open($(this.makeSelector("url")).val());
  }

  render() {
    let bird = this.props.bird;
    this.setFormValues(bird);
    let sightingDate = moment(bird.sightingdate).format('YYYY/MM/DD');
    return (
      <div className="birdCardPanel">
        <div className="birdCardForm">
          <form  onSubmit={this.handleSave}>
            <table className="sightingForm">
              <tbody>
                <tr>
                  <td>Mom Name:</td>
                  <td>
                    <input id={this.makeId("momname")} type="text" value={bird.momname} readOnly/>
                    <input id={this.makeId("birdId")} type="hidden" defaultValue={this.props.cardId} />
                  </td>
                </tr>
                <tr>
                  <td>Location:</td>
                  <td>
                    <a href={`http://maps.google.com?q=${bird.lat},${bird.lng}`} target="_blank"><i className="fa fa-external-link"></i></a>
                    <input onChange={this.inputChange} id={this.makeId("address")} type="text" defaultValue={bird.address} />
                  </td>
                </tr>
                <tr>
                  <td>Lattitude:</td><td><input id={this.makeId("lat")} type="text" defaultValue={bird.lat} onChange={this.inputChange}/></td>
                </tr>
                <tr>
                  <td>Longitude:</td><td><input id={this.makeId("lng")} type="text" defaultValue={bird.lng} onChange={this.inputChange}/></td>
                </tr>
                <tr>
                  <td>Date:</td><td><input id={this.makeId("sightingDatePicker")} type="text" defaultValue={sightingDate} onChange={this.inputChange}/></td>
                </tr>
                <tr>
                  <td>URL:</td>
                  <td>
                    <a href={bird.url} target="_blank"><i className="fa fa-external-link"></i></a>
                    <input id={this.makeId("url")} type="text" defaultValue={bird.url} onChange={this.inputChange}/>
                  </td>
                </tr>
                <tr>
                  <td>Image URL:</td>
                  <td>  
                    <a href={bird.imageurl} target="_blank"><i className="fa fa-external-link"></i></a>
                    <input id={this.makeId("imageurl")} type="text" defaultValue={bird.imageurl} onChange={this.inputChange}/>
                  </td>
                </tr>
                <tr>
                  <td>Thumb URL:</td>
                  <td>  
                    <a href={bird.thumburl} target="_blank"><i className="fa fa-external-link"></i></a>
                    <input id={this.makeId("thumburl")} type="text" defaultValue={bird.thumburl} onChange={this.inputChange}/>
                  </td>
                </tr>
              </tbody>
            </table>
            <input type="submit" value="Save" />
          </form>
        </div>
      </div>
    );
  }
}

Birds.propTypes = {
  bird: PropTypes.object.isRequired,
  cardId: PropTypes.number.isRequired
};

export default Birds;