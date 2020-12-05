import _ from 'underscore';
import logger from '../core/util/log';

var recognition = null;
var startTimestamp = null;

try {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
  var recognition = new SpeechRecognition();
} catch(e) {
  alert("Speech recognition not available")
}

let isReady = false;
let isListening = false;
let ignore_onend = false;

var interim_transcript = '';
var final_transcript = '';

function sequence(f1, f2) {
  return function (e) { f1(e); f2(); } 
}

function compose(f1, f2) {
  return function (e) { f2(f1(e)); } 
}

function sequenceOnEnd(optionalOnEnd) {
  return function (e) { 
      onEnd();
      if (!ignore_onend)
        optionalOnEnd();
      }
}

function init(options) {
  logger.log("initializing speech recognition")
  if (!('webkitSpeechRecognition' in window)) {
      isReady = false;
  } else {
      isReady = true;
      logger.log(`options: ${JSON.stringify(options)}`)
      initOptions(options);
  }
}

function initOptions(options) {
  if (isReady) {
    recognition.continuous = options && _.isBoolean(options.continuous)?options.continuous:false;
    recognition.interimResults = options && _.isBoolean(options.interimResults)?options.interimResults:false;
    recognition.maxAlternatives = options && _.isNumber(options.maxAlternatives)?options.maxAlternatives:1;
    recognition.language = "en-US";
    recognition.onstart = options && _.isFunction(options.onstart) ?  options.onstart : onStart;
    recognition.onresult = options && _.isFunction(options.onresult) ? options.onresult : onResult;
    recognition.onerror = options && _.isFunction(options.onerror) ?  compose(onError, options.onerror) : onError;
    recognition.onend = options && _.isFunction(options.onend) ? sequenceOnEnd(options.onend) : onEnd;
    
    recognition.audiostart = options && _.isFunction(options.audiostart) ? options.audiostart : audioStart;
    recognition.audioend = options && _.isFunction(options.audioend) ? options.audioend : audioEnd;
    recognition.speechstart = options && _.isFunction(options.speechstart) ? options.speechstart : speechStart;
    recognition.speechend = options && _.isFunction(options.speechend) ? options.speechend : speechEnd;
    recognition.soundstart = options && _.isFunction(options.soundstart) ? options.soundstart : soundStart;
    recognition.soundend = options && _.isFunction(options.soundend) ? options.soundend : soundEnd;
    recognition.nomatch = options && _.isFunction(options.nomatch) ? options.nomatch : noMatch;
  }
}

function start() {
  logger.log("starting speech recognition")
    if (isReady) {
        interim_transcript = '';
        final_transcript = '';
        isListening = true;
        ignore_onend = false;
        var d = new Date();
        startTimestamp = d.getTime();
        recognition.start();
    }
}

function stop() {
  logger.log("stoping speech recognition")
    if (isReady) {
      ignore_onend = true;
      recognition.stop();
    }
}

function audioStart() {
  logger.log("speech recognition: audioStart")
}
function audioEnd() {
  logger.log("speech recognition: audioEnd")
}
function speechStart() {
  logger.log("speech recognition: speechStart")
}
function speechEnd() {
  logger.log("speech recognition: speechEnd")
}
function soundStart() {
  logger.log("speech recognition: soundStart")
}
function soundEnd() {
  logger.log("speech recognition: soundEnd")
}
function noMatch() {
  logger.log("speech recognition: noMatch")
}

function onStart() {
  logger.log("speech recognition: onStart")
}

function onEnd() {
  if (!ignore_onend) {
    logger.log("speech recognition: onEnd")
    isListening = false;
  }
}

function onError(event) {
  logger.log("speech recognition: onError")
    isListening = false;
    ignore_onend = true;
    if (event.error == 'no-speech') {
      logger.log('recognition.onError(): info_no_speech');
      return "No speech received";
    }
    if (event.error == 'audio-capture') {
      logger.log('recognition.onError(): info_no_microphone');
      return "No microphone available";
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - startTimestamp < 100) {
        recognition.stop();
        logger.log('recognition.onError(): info_blocked');
        return "Microphone blocked";
      } else {
        logger.log('recognition.onError(): info_denied');
        return "Microphone access denied";
      }
    }
    return event.error;
}

function onResult(event) {
  logger.log("speech recognition onResult")

  if (typeof(event.results) == 'undefined') {
      recognition.onend = null;
      recognition.stop();
      return;
    }
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      final_transcript += event.results[i][0].transcript;
    } else {
      interim_transcript += event.results[i][0].transcript;
    }
  }
  logger.log("interm transcript: "+interim_transcript);
  logger.log("final transcript: "+final_transcript);
}

function getResult() {
  return final_transcript;
}

function isSpeechAvailable() {
   return isReady;
}

export default {
    init: init,
    start: start,
    stop: stop,
    isSpeechAvailable: isSpeechAvailable,
    getResult: getResult,
    initOptions: initOptions
}