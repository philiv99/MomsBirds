import React from 'react';
import PropTypes from 'prop-types';
import _ from "underscore";
import toastr from 'toastr'
import windowdemensions from "../../core/util/windowdemensions.js";
import dragElement from "../../core/util/draggable.js";
import logger from "../../core/util/log.js"
import conversationService from '../../services/conversationService.js'
import BirdCard from '../BirdCard/BirdCard.jsx'
import Tabs from '../Tabs/Tabs.jsx'
import contentEnums from '../../core/data/enums/contentEnums.js';
import "./EditPanel.less";


class EditPanel extends React.Component {
  constructor(props) {
    super();
    
    this.dragElement = React.createRef();

    this.getPanelHeight = this.getPanelHeight.bind(this);
    this.getPanelWidth = this.getPanelWidth.bind(this);

    this.handleNewUtterance  = this.handleNewUtterance.bind(this);

    this.startListening = this.startListening.bind(this);
    this.stopListening = this.stopListening.bind(this);
    this.toggleCollapsed = this.toggleCollapsed.bind(this);

    this.handleListeningEnd = this.handleListeningEnd.bind(this);
    this.handleUpdateContent = this.handleUpdateContent.bind(this);
    this.HandleListeningError = this.HandleListeningError.bind(this);
    
    this.birdUpdated = this.birdUpdated.bind(this);

    let sizeFactor = .5;
    let panelTop = 9;
    let panelLeft = 75;
    let panelHeight = this.getPanelHeight();
    let panelWidth = this.getPanelWidth();
    if (props && props.displayOptions) {
        sizeFactor = props.displayOptions.sizeFactor?props.displayOptions.sizeFactor:sizeFactor;
        panelTop = props.displayOptions.panelTop?props.displayOptions.panelTop:panelTop;
        panelLeft = props.displayOptions.panelLeft?props.displayOptions.panelLeft:panelLeft;
        panelHeight = props.displayOptions.panelHeight?props.displayOptions.panelHeight:panelHeight;
        panelWidth = props.displayOptions.panelWidth?props.displayOptions.panelWidth:panelWidth;
    }
    let content = this.assembleContent(props, []);
    let collapsed = content  && content.length>0;
    content.push({
        id: 0,
        title: "Help",
        command: "Help",
        status: contentEnums.statuses.STATIC,
        selected: true,
        content: <div>Help text</div>
      });

    this.state = {
        isListening: false,
        panelTop: panelTop,
        panelLeft: panelLeft,
        panelWidth: panelWidth,
        panelWidth: panelWidth,
        transcript: '',
        collapsed: collapsed,
        bird: null,
        commands: [],
        content: content,
        selectedTab : 0
    };
  }

  componentDidMount() {
    dragElement(this.dragElement.current);
    let commandOptions = {
        newCommand: this.handleNewUtterance,
        ListeningEnd: this.handleListeningEnd,
        UpdateContent: this.handleUpdateContent,
        HandleError: this.HandleListeningError
    }
    conversationService.init(commandOptions);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.didContentPropChange(prevProps, prevState)) {
      var newContent = this.state.newContent?this.state.newContent:[];;
      this.setState({tabs: this.assembleContent(prevProps, newContent)})
    }
  }

  didContentPropChange(prevProps, prevState) {
    return (prevProps.content.length+this.state.newContent.length) != (prevState.tabs.length-1)
  }
  
  clearSelected() {
    var tabs = this.state.tabs;
    tabs.forEach((tab) => {
      tab.selected = false
    })
  }

  assembleContent(props, newContent) {
    let tabs = [];
    if (props && props.birds && props.birds.length>0) {
      props.birds.map((bird) => {
        let cardId = tabs.length+1;
        tabs.push({
          title: bird.momname,
          command: bird.utterance,
          status: contentEnums.statuses.STATIC,
          selected: (cardId == this.state.selected),
          content: <BirdCard status={bird.status} bird={bird} birdUpdated={this.birdUpdated} cardId={cardId}></BirdCard>
        })
      })
    }
    if (newContent && newContent.length>0) {
      newContent.forEach((tab) =>{
        tabs.push(tab);
      })
    }
    tabs.push({
        title: "Help",
        command: "Help",
        status: contentEnums.statuses.STATIC,
        selected: false,
        content: <div>Help text</div>
      });
    return tabs;
  }

  handleNewUtterance(cmd) {
    let newCommands = this.state.commands;
    newCommands.push(cmd);
    this.setState({commands: newCommands});
  }

  handleUpdateContent(update) {
    if (update.model == "BirdSighting") {
      logger.log(`Bird command recognized: ${update.content.utterance}`, logger.logLevels.INFO)
      let newContent = this.state.newContent?this.state.newContent:[];
      let cardId = newContent.length;
      newContent.push({
        title: update.content.momname,
        command: update.content.utterance,
        content: <BirdCard bird={update.content} birdUpdated={this.birdUpdated} cardId={cardId}></BirdCard>
      })
      this.setState({bird:update.content, collapsed: false, newContent: newContent})
    }
  }
  
  HandleListeningError(errorMessage) {
    toastr.error(`Speech recognition error: ${errorMessage}`)
    this.setState({isListening:false});
  }
  
  getPanelHeight() {
    const panelHeight = windowdemensions.getWindowHeight();
    return Math.floor(panelHeight-(panelHeight/2));
  }

  getPanelWidth() {
    const panelWidth = windowdemensions.getWindowWidth();
    return Math.floor(panelWidth-(panelWidth*0.65));
  }
  
  handleListeningEnd() {
    this.setState({isListening:false});
  }

  startListening() {
    logger.log("Listening for commands now...", logger.logLevels.WARNING)
    conversationService.startListening();
    this.setState({isListening:true});
  }

  stopListening() {
    logger.log("Stopped listening for commands.", logger.logLevels.WARNING)
    conversationService.stopListening();
    this.setState({isListening:false});
  }

  toggleCollapsed() {
    this.setState({ collapsed: !this.state.collapsed })
  }

  birdUpdated() {
    this.setState({ collapsed: false })
    logger.log("Bird updated...", logger.logLevels.INFO)
  }

  renderMic() {
    if (this.state.isListening) {
        return <div title="Click mic to stop listening">
                  <a href="#" onClick={this.stopListening}><i id="microphoneIcon" className={`fa fa-microphone fa-pulse`}></i></a>
               </div>;
    } else {
        return <div title="Click mic to start listening">
                  <a href="#" onClick={this.startListening}><i id="microphoneIcon" className={`fa fa-microphone speaker-mic-off`}></i></a>
               </div>;
    }
  }

  renderHeaderText() {
    return "Edit Panel";
  }

  render () {
    let panelStyle = { 
        top: this.state.panelTop, 
        left: this.state.panelLeft, 
        width: this.state.panelWidth,
        height: this.state.collapsed?40:this.state.panelHeight
    }
    let panelTextStyle = {
      display:  this.state.collapsed?'none':'block'
    }
    let microphone = this.renderMic();
    let headerText = this.renderHeaderText();
    let panelContent =<Tabs tabInfo={this.state.tabs}/>;
    let chevronIcon = this.state.collapsed?'fa-chevron-down':'fa-chevron-up';
    let chevronTitle = this.state.collapsed?'Click to open edit panel':'Click to close edit panel';

  
    return (
      <div style={panelStyle} id="speakerpanel" className="speakerpanel display-block" ref={this.dragElement}>
        <div id="speakerpanelheader" className="speaker-header">
              <div className="speaker-mic">
                  {microphone}
              </div>
              <div className="speaker-buttons">
                  <button onClick={this.toggleCollapsed} title={chevronTitle}><i className={`fa ${chevronIcon}`} ></i></button>
              </div>
              <div className="speaker-text">
                  {headerText}
              </div>
        </div>
        <div className="speaker-content" style={panelTextStyle}>
            <div>
                {panelContent}
            </div>
        </div>
      </div>
    );
  }
}

EditPanel.propTypes = {
    displayOptions: PropTypes.object,
    content: PropTypes.array
};

export default EditPanel;