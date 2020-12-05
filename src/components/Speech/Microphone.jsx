import React from 'react';

const Microphone = ({isListening}) => {
    let pulseClass = isListening ? 'fa-pulse' : '';
    return (
        <i id="microphoneIcon" className={`fa fa-microphone ${pulseClass}`}></i>
    );
  };

  export default Microphone;