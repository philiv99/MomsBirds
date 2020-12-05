
import { renderToString } from 'react-dom/server'
import Marker from "../../components/Marker/Marker.jsx";
import dataAccess from '../data/dataAccess.js';
import contentEnums from "../data/enums/contentEnums";


function create(event) {
    return dataAccess.post('birdsighting', false, event);
}

function save(event) {
    return dataAccess.update(`birdsighting/${event.id}`, true, event);
}

function isValidBird(bird) {
    return (bird && bird.id);
}


function load(eventId) {
    return dataAccess.get(`birdsighting/${eventId}`);
        //.then(bird => { return projectBirdSighting(bird); });
}

function remove(eventId) {
    return dataAccess.remove(`birdsighting/${eventId}`);
}

function loadAll() {
    return dataAccess.get(`birdsighting`, false);
        //.then(birdSightings => { return(projectBirdSightings(birdSightings))});
}

export default {
    create: create,
    save: save,
    load: load,
    loadAll: loadAll,
    remove: remove
}