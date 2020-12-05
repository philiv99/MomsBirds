import speechRecognitionService from "./speechRecognitionService";
import logger from '../core/util/log.js'
import ObservableArray from '../core/util/ObservableArray.js'


// export default {
//     init: init,
//     start: start,
//     isSpeechAvailable: isSpeechAvailable,
//     getResult: getResult,
//     initOptions: initOptions
// }

var commands = new ObservableArray([]);
var isSpeechRecognitionInitialized = false;

var finalTranscript = '';
var final_transcript = '';

let onCommandComplete = (cmd) => { 
    commands.push(finalTranscript);
    logger.log(`CommandService: default onCommandComplete: [${cmd}]`) 
};
let onFinalTranscript = (final) => {  
    logger.log(`CommandService: default onFinalTranscript: [${final}]`) 
};

function handleInterimResult(event) {
    if (typeof(event.results) == 'undefined') {
        recognition.onend = null;
        recognition.stop();
        return;
    }
    
    let interimTranscript = '';
    for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
      let transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
        final_transcript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }
    if (interimTranscript == "" && finalTranscript != "") {
        onCommandComplete(finalTranscript)
        finalTranscript = '';
    }
}

function handleonstart(start) {
    logger.log(`CommandService: onstart: ${JSON.stringify(start)}`);
}

function handleonerror(error) {
    logger.log(`CommandService: onerror: ${JSON.stringify(error)}`, logger.logLevels.ERROR);
}

function handleonend() {
    logger.log(`CommandService: onend`);
    onFinalTranscript(final_transcript);
}

function init(commandOptions, onNewCommandCallBack) {
    let speechRecognitionOptions = {
        continuous : true,
        interimResults : true,
        maxAlternatives : 1,
        language : "en-US",
        onstart : handleonstart,
        onresult : handleInterimResult,
        onerror : commandOptions.HandleError?commandOptions.HandleError:handleonerror,
        onend : commandOptions.ListeningEnd?commandOptions.ListeningEnd:handleonend
    };
    onCommandComplete = onNewCommandCallBack;//commandOptions.newCommand?commandOptions.newCommand:onCommandComplete;
    onFinalTranscript = commandOptions.finalTranscript?commandOptions.finalTranscript:onFinalTranscript;
    commands.addEventListener("itemadded", onNewCommandCallBack);

    speechRecognitionService.init(speechRecognitionOptions);
    isSpeechRecognitionInitialized = true;
    
}

function startListening() {
    if (speechRecognitionService.isSpeechAvailable() && isSpeechRecognitionInitialized)
        speechRecognitionService.start();
    else 
        logger.log("CommandService: Speech recognition not available",logger.logLevels.ERROR)
}

function stopListening() {
    if (speechRecognitionService.isSpeechAvailable() && isSpeechRecognitionInitialized)
        speechRecognitionService.stop();
}

export default {
    init: init,
    startListening: startListening,
    stopListening: stopListening
};