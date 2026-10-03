import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import speechRecognitionService from '../../services/speechRecognitionService.js';
import birdbuilderservice from '../../services/birdbuilderservice.js'
import './AppMenu.less';
import birdmanager from '../../services/birdmanager.js';
import Modal from '../Modal/Modal.jsx';
import commandService from '../../services/CommandService.js'

  constructor(props) {
    super();
    
    this.state = { 
      showMenu: false, 
      listening: false, 
      showModal: false, 
      modalMessage: "Listening...", 
      speechIsReady: props.speechIsReady 
    };
    
    this.hideModal = this.hideModal.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.onSpeechRecognitionEnd = this.onSpeechRecognitionEnd.bind(this);
    this.onSpeechRecognitionError = this.onSpeechRecognitionError.bind(this);
    this.birdHasBeenBuilt = this.birdHasBeenBuilt.bind(this);
    this.birdFailedToBeBuilt = this.birdFailedToBeBuilt.bind(this);
    this.stopMicrophonePulse = this.stopMicrophonePulse.bind(this);
    this.startMicrophonePulse = this.startMicrophonePulse.bind(this);
    this.setModalMessage = this.setModalMessage.bind(this);
    this.tryAgain = this.tryAgain.bind(this);
    this.trySpeechRecognition = this.trySpeechRecognition.bind(this);
  }
  
  toggleMenu() {
    const newShowMenuState = !this.state.showMenu;
    this.setState({ showMenu: newShowMenuState });
  }

  birdHasBeenBuilt(bird) {
    this.hideModal();
    birdmanager.addBird(bird)
    .then(response => { 
      this.props.setContent("birds", bird) 
    });
  }

  birdFailedToBeBuilt(errorMessage) {
    this.stopMicrophonePulse();
    this.setModalMessage(errorMessage);
  }
  
  onSpeechRecognitionEnd() {
    const utterance = speechRecognitionService.getResult();
    if (!_.isEmpty(utterance)) {
      birdbuilderservice.buildBirdObject(utterance, this.birdHasBeenBuilt, this.birdFailedToBeBuilt);
    } else {
      this.stopMicrophonePulse();
      this.setModalMessage("Did not hear anything. Click Microphone to try again.");
    }
    this.setState({listening: false});
  }

  onSpeechRecognitionError(errorMessage) {
    this.stopMicrophonePulse();
    this.setModalMessage(errorMessage);
  }

  stopMicrophonePulse(){
    $('#microphoneIcon').removeClass("fa-pulse");
  }

  startMicrophonePulse(){
    $('#microphoneIcon').addClass("fa-pulse");
  }

  setModalMessage(message) {
    this.setState({modalMessage: message});
  }

  closeModal() {
    this.hideModal();
  }

  tryAgain() {
    if (!this.state.listening)
      this.trySpeechRecognition();
  }

  trySpeechRecognition() {
    this.setState({showMenu: false, listening: true, showModal: true, modalMessage: "Listening..."});
    this.startMicrophonePulse();
    // speechRecognitionService.initOptions({ 
    //                     onend : this.onSpeechRecognitionEnd, 
    //                     onerror: this.onSpeechRecognitionError
    //                   });
    // speechRecognitionService.start();
    commandService.start();
  }

  getMenuItems() {
    if (!this.state.showMenu) return null;

    const setMapContent = () => {
        this.props.setContent("map");
        this.toggleMenu();
    };
    const setBirdsContent = () => {
        this.props.setContent("birds");
        this.toggleMenu();
    };
    const setSourcesContent = () => {
        this.props.setContent("sources");
        this.toggleMenu();
    };

    const startSpeechRecognition = () => {
      //let utterance = "Mom saw a Mexican chickadee on October 12th 1972 in Mexico City Mexico";
      //birdbuilderservice.buildBirdObject(utterance, this.birdHasBeenBuilt, this.birdFailedToBeBuilt);
      this.trySpeechRecognition();
    }

    let speechMenuItemRow = this.state.speechIsReady
            ? <tr><td><a href="#" onClick={startSpeechRecognition}>Speak</a></td></tr>
            : null;

    return  (
      <table className="appmenuitems">
          <tbody>
              <tr><td><a href="#" onClick={setMapContent}>Map</a></td></tr>
              <tr><td><a href="#" onClick={setBirdsContent}>Birds</a></td></tr>
              <tr><td><a href="#" onClick={setSourcesContent}>The List</a></td></tr>
              {speechMenuItemRow}
          </tbody>
      </table>
    )
  }

  hideModal() {
    this.setState({ showModal: false, modalMessage: "Listening..." });
  };

  render() {
    const menuItems = this.getMenuItems();
    const modalMessage = this.state.modalMessage;
    return (
      <div className="appmenu">
        <Modal show={this.state.showModal} handleClose={this.hideModal}>
          <i id="microphoneIcon" onClick={this.tryAgain} className="fa fa-microphone fa-pulse fa-3x"></i>
          <br/>
          <span className="modal-message">{modalMessage}</span>
        </Modal>
        <a href="#" onClick={this.toggleMenu}><i className=" fa fa-bars"></i></a>
        {menuItems}
      </div>
    );
  }
}