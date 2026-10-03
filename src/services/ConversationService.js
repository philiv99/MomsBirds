
// example test conversation...
//
// "Good morning." 
// [General context -- Greeting] -- "What can I do for you?"
// [Expecting to enter Command context]
// "I want to add a bird sighting."
// [Command context -- Create -- Bird Sighting] -- "Tell what, when, and where"
// [Expecting bird sighting informational phrase]
// "Just a minute."
// [General context -- Wait] -- "Okay"
// [Expecting time delay and bird sighting informational phrase]
// "I saw an American Crow on Sunday, may 3rd"
// [Informational context -- Bird Sighting Informational phrase -- What -- When]
// [Expecting bird sighting informational phrase or correction]
// "I saw it at 3032 Meadowbrook boulevard cleveland heights ohio"
// [Informational context -- Bird Sighting Informational phrase -- where]
// [Expecting bird sighting informational phrase or correction]

// structure...
//
// Timeline of general phrases
// Timeline of command contexts
//     Timeline of commands, informational phrases, and informational corrections

// let utterances = [];

// function readCommand() {
//     // get interim text
//     // based on current context, prioritize models for analyzing text
//     // process analyzed text
//     // 
// }

// function queueContext() {

// }

import logger from '../core/util/log.js'
import commandService from './CommandService.js'
import birdbuilderservice from './birdbuilderservice.js'
import witai from './witai.js'
import toastr from 'toastr'

let postToBirdCard = function() {};
let newCommand = function() {};

function birdHasBeenBuilt(bird) {
    postToBirdCard({model: "BirdSighting", content: bird});
 }

 function birdFailedToBeBuilt(errorMessage) {
     toastr.error(`Bird command not recognized: ${errorMessage}`)
 }


function newUtterance(utterance) {
    logger.log(`ConversationService: newUtterance: [${utterance}]`)
    newCommand(utterance);
    birdbuilderservice.buildBirdObject(utterance, birdHasBeenBuilt, birdFailedToBeBuilt);
}

function init(commandOptions) {
    postToBirdCard = commandOptions.UpdateContent;
    newCommand = commandOptions.newCommand;
    commandOptions.ListeningEnd = startListening;
    commandService.init(commandOptions, newUtterance);
}

function startListening() {
    commandService.startListening();
}

function stopListening() {
    commandService.stopListening();
}

export default {
    init: init,
    startListening: startListening,
    stopListening: stopListening
}