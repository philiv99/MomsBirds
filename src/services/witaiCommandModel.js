
import _ from 'underscore';
import config from "config";
import dataAccess from '../core/data/dataAccess.js';

const commandAuth = 'Bearer ' + config.commandToken;
const threshold = 0.5;


function getIntentInformation(extractedData) {
  let intentInfo = {}
  if (extractedData && extractedData.intents && extractedData.intents.length>0) {
    const intent = extractedData.intents[0];
    intentInfo["confidence"] = intent.confidence;
  }
  return intentInfo;
}

function getCommandInformation(extractedData) {
  let commandInfo = {}
  if (extractedData && extractedData.entities) {
    const commandEntities = extractedData.entities["command"];
    if (commandEntities && commandEntities.length>0) {
      const commandEntity = commandEntities[0];
      commandInfo = {
        command: {
          "start": commandEntity.start,
          "end": commandEntity.end,
          "body": commandEntity.body,
          "confidence": commandEntity.confidence,
          "grain": commandEntity.grain,
          "value": commandEntity.value,
        }
      }
    }
  }
  return commandInfo;
}

function normalize(extractedData) {
    let normalizedData = {}
    if (extractedData) {
        normalizedData["text"] = extractedData.text;
        normalizedData["model"] = "Command";
        Object.assign(normalizedData, getCommandInformation(extractedData));
    }
    return normalizedData;
}

function isExtractValid(extract) {
  let valid = true;
  if (extract) {
    valid = valid & (extract.confidence && extract.confidence > threshold)
                  & (extract.command && extract.command.confidence > threshold);
  } else {
    valid = false;
  }

  return valid;
}

function interpret(utterance) {
  const uri = encodeURI(`https://api.wit.ai/message?q=${utterance}`);
  return dataAccess.get(uri, true, {Authorization: birdAuth})
                    .then(res => { return normalize(res) });
}

export default {
    interpret: interpret,
    isExtractValid: isExtractValid
}