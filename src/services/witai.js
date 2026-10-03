
import dataAccess from '../core/data/dataAccess.js';
import birdModel from './witaiBirdSightingModel.js'
import commandModel from './witaiCommandModel.js'

function interpretCommand(utterance) {
  return commandModel.interpret(utterance, commandAuth);
}

function interpretBirdInfo(utterance) {
  return birdModel.interpret(utterance);
}

function isExtractValid(extract) {
  if (extract && extract.model) {
    if (extract.model == "BirdSighting") 
      return birdModel.isExtractValid(extract);
    else
      return commandModel.isExtractValid(extract);
  }
  return false;
}

function train() {
  var trainData = [
    {
      "text": "Mom saw a boobie in the Cleveland Ohio on july 15th 1977",
      "intent": "sighting",
      "entities": [
        {
          "entity": "bird:bird",
          "start": 10,
          "end": 15,
          "body": "boobie",
          "entities": []
        },
        {
          "entity": "wit$location:location",
          "start": 24,
          "end": 37,
          "body": "Cleveland Ohio",
          "entities": []
        },
        {
          "entity": "wit$datetime:datetime",
          "start": 37,
          "end": 55,
          "body": "july 15th 1977",
          "entities": []
        }
      ],
      "traits": []
    }
  ];
  
  const url = 'https://api.wit.ai/utterances';

  return dataAccess.post(url, true, trainData, {Authorization: auth})
      .then(res => {log(`Success sending utterance data to Wit.ai: ${JSON.stringify(res)}`)})
      .catch(err => log(`Error sending utterance data to Wit.ai: ${err}`));
  
}

export default {
    interpretCommand: interpretCommand,
    interpretBirdInfo: interpretBirdInfo,
    isExtractValid: isExtractValid,
    train: train
}