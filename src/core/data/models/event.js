import { eventStatuses } from '../enums/eventStatuses.js';
import { get } from 'jquery';

let event = {
    id:-1,
    eventtype:null,
    name:null,
    propername:null,
    url:null,
    imageurl:null,
    thumburl:null,
    address:null,
    lat:null,
    lng:null,
    date:null,
    description:null,
    status: eventStatuses.NONE
};

let isDbManagerLoaded = false;

let eventDbManager = {};

function load(eventId) {
    return eventDbManager.load(eventId).then(ev => { event = ev; event.status = eventStatuses.LOADED});
}

function update(eventUpdates) {
    event = { ...event, ...eventUpdates };
    if (event.id == null)
        event.status = eventStatuses.NEW;
    else 
        event.status = eventStatus.CHANGED;
}

function remove() {
    event.status = eventStatuses.REMOVED;
}

function create(inEvent) {
    event = inEvent;
    event.id = null;
    event.status = eventStatuses.NEW;
}

function save() {
    if (isDbManagerLoaded) {
        switch (event.status) {
            case eventStatuses.NONE: break;
            case eventStatuses.LOADED: break;
            case eventStatuses.NEW: 
                return eventDbManager.create(event).then(result => { event.status = eventStatuses.LOADED });
            case eventStatuses.CHANGED: 
                return eventDbManager.save(event).then(result => { event.status = eventStatuses.LOADED });
            case eventStatuses.REMOVED: 
                return eventDbManager.remove(event.id).then(result => { 
                        event = {};
                        event.status = eventStatuses.NONE
                    });
        }
        return Promise.resolve("No change");
    }
    return Promise.reject("Manager is not loaded");
}

function get() {
    return event;
}

function init(eventDbManager) {
    eventDbManager = eventDbManager;
    isDbManagerLoaded = true;
}

export default {
    init: init,
    load: load,
    update: update,
    remove: remove,
    create: create,
    get: get,
    save: save
}