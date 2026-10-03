
import _ from 'underscore';
import config from "config";
import dataAccess from '../core/data/dataAccess.js';

const birdAuth = 'Bearer ' + config.birdToken;
const threshold = 0.5;


function getIntentInformation(extractedData) {
  let intentInfo = {}
  if (extractedData && extractedData.intents && extractedData.intents.length>0) {
    const intent = extractedData.intents[0];
    intentInfo["confidence"] = intent.confidence;
  }
  return intentInfo;
}

function getSightingDateInformation(extractedData) {
  let sightingDateInfo = {}
  if (extractedData && extractedData.entities) {
    const sightingDateEntities = extractedData.entities["wit$datetime:datetime"];
    if (sightingDateEntities && sightingDateEntities.length>0) {
      const sightingDateEntity = sightingDateEntities[0];
      sightingDateInfo = {
        sightingDate: {
          "start": sightingDateEntity.start,
          "end": sightingDateEntity.end,
          "body": sightingDateEntity.body,
          "confidence": sightingDateEntity.confidence,
          "grain": sightingDateEntity.grain,
          "value": sightingDateEntity.value,
        }
      }
    }
  }
  return sightingDateInfo;
}

function getLocationInformation(extractedData) {
  let locationInfo = {}
  if (extractedData && extractedData.entities) {
    //
    // "entities": {
    //   "wit$datetime:datetime": [
    const locationEntities = extractedData.entities["wit$location:location"];
    if (locationEntities && locationEntities.length>0) {
      const locationEntity = locationEntities[0];
      locationInfo = {
        location: {
          "start": locationEntity.start,
          "end": locationEntity.end,
          "body": locationEntity.body,
          "confidence": locationEntity.confidence,
          "value": locationEntity.value,
        }
      }
    }
  }
  return locationInfo;
}

function getBirdInformation(extractedData) {
  let birdInfo = {}
  if (extractedData && extractedData.entities) {
    //
    // "entities": {
    //   "wit$datetime:datetime": [
    const birdEntities = extractedData.entities["bird:bird"];
    if (birdEntities && birdEntities.length>0) {
      const birdEntity = birdEntities[0];
      birdInfo = {
        bird: {
          "start": birdEntity.start,
          "end": birdEntity.end,
          "body": birdEntity.body,
          "confidence": birdEntity.confidence,
          "value": birdEntity.value,
        }
      }
    }
  }
  return birdInfo;
}


function normalize(extractedData) {
    let normalizedData = {}
    if (extractedData) {
        normalizedData["text"] = extractedData.text;
        normalizedData["model"] = "BirdSighting";
        Object.assign(normalizedData, getIntentInformation(extractedData));
        Object.assign(normalizedData, getSightingDateInformation(extractedData));
        Object.assign(normalizedData, getLocationInformation(extractedData));
        Object.assign(normalizedData, getBirdInformation(extractedData));
    }
    return normalizedData;
}

function isExtractValid(extract) {
  let valid = true;
  if (extract) {
    valid = valid & (extract.confidence && extract.confidence > threshold)
                  & (extract.location && extract.location.confidence > threshold)
                  & (extract.sightingDate && extract.sightingDate.confidence > threshold)
                  & (extract.bird && extract.bird.confidence > threshold);
  } else {
    valid = false;
  }

  return valid;
}

function interpret(utterance) {
  const uri = encodeURI(`https://api.wit.ai/message?q=${utterance}`);
  return dataAccess.get(uri, true, {Authorization: birdAuth})
                    .then(res => { return normalize(res) });
    // example return value:
    // extract: 
    let extract = {
        "text": "Mom saw a black bird in bethany west virginia on august 3rd 1935",
        "confidence": 1,
        "sightingDate": {
            "start": 46,
            "end": 64,
            "body": "on august 3rd 1935",
            "confidence": 0.973,
            "grain": "day",
            "value": "1935-08-03T00:00:00.000-08:00"
        },
        "location": {
            "start": 24,
            "end": 45,
            "body": "bethany west virginia",
            "confidence": 0.9443,
            "value": "bethany west virginia"
        },
        "bird": {
            "role": "bird",
            "start": 10,
            "end": 20,
            "body": "black bird",
            "confidence": 0.5184,
            "value": "black bird",
        }
    }

}

export default {
    interpret: interpret,
    isExtractValid: isExtractValid
}