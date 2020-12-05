
import React from 'react';
import { renderToString } from 'react-dom/server'
import _ from 'underscore'
import birdDbManager from "../core/managers/birdDbManager";
import Marker from "../components/Marker/Marker.jsx";
import log from '../core/util/log.js'
    
let markeryears = [];
let birdsByYearOffset = [];
let yearOffset = 0;
let searchText = "";
let minyear = 3000;
let maxyear = 0;
let birdData = null;
let newMarkerElementId = "";
let defaultSortByProperty = 'sightingdate';

function initialize(markerElementId) {
    newMarkerElementId = markerElementId;
    return birdDbManager.loadAll()
        .then(data => { 
            birdData = data; 
            prepareBirdsByYearOffset(birdData);
        });
}

function getNewMarkerElement() {
    return $(`#${newMarkerElementId}`).clone().get();
}

function getMarkerOptionsBySearchText(inSearchText) {
    searchText = inSearchText;
    let birds = _.filter(birdData,(bird) => {
        let normalizedSearchText = searchText.toLowerCase();
        let normalizedMomname = bird.momname.toLowerCase();
        let normalizedLocation = bird.address.toLowerCase();
        return normalizedMomname.includes(normalizedSearchText) || normalizedLocation.includes(normalizedSearchText);
    })

    return convertBirdsListToMarkerOptionsList(birds);
}

function getAllMarkerOptions() {
    return convertBirdsListToMarkerOptionsList(birdData);
}
    
function getMarkerOptionsByYearOffset(inYearOffset) {
    yearOffset = inYearOffset;
    let birds = [];
    if (yearOffset == -1) {
        birds = [].concat.apply([], this.birdData);
    } else {
        birds = birdsByYearOffset[yearOffset];
    }
    return convertBirdsListToMarkerOptionsList(birds);
}

function convertBirdsListToMarkerOptionsList(birds){
    let markerOptionList = [];
    if (birds && birds.length>0) {
        birds.forEach( (bird) => {
            let markerOptions = {
                id: bird.id,
                el: getNewMarkerElement(),
                lat: bird.lat,
                lng: bird.lng,
                popupHTML: renderToString(<Marker bird={bird} id={bird.id}/>)
            }
            markerOptionList.push(markerOptions);
        })
    }
    return markerOptionList;
}

function getMarkerOptions(bird){
    let markerOptions = {};
    if (bird) {
        markerOptions = {
            id: bird.id,
            el: getNewMarkerElement(),
            lat: bird.lat,
            lng: bird.lng,
            popupHTML: renderToString(<Marker bird={bird} id={bird.id}/>)
        }
    }
    return markerOptions;
}

function getBirdsByYearOffset(yearOffset, sortOrder=defaultSortByProperty) {
    let returnBirds = [];
    if (yearOffset>=0 && birdsByYearOffset) {
       let birds = birdsByYearOffset[yearOffset];
       if (birds && birds.length>=1) {
           returnBirds = _.sortBy(birds, sortOrder);
       }
    } 
    return returnBirds;
}


function getBirdsBySearchText(searchText,  sortOrder=defaultSortByProperty) {
    let returnBirds = [];
    if (searchText && searchText != "") {
        let birds = _.filter(birdData,(bird) => {
            let normalizedSearchText = searchText.toLowerCase();
            let normalizedMomname = bird.momname.toLowerCase();
            let normalizedLocation = bird.address.toLowerCase();
            return normalizedMomname.includes(normalizedSearchText) || normalizedLocation.includes(normalizedSearchText);
        })
       if (birds && birds.length>=1) {
           returnBirds = _.sortBy(birds, sortOrder);
       }
    } 
    return returnBirds;
}

function updateBirdsData (bird) {
    var sightingyear = bird.sightingdatearray[0];
    var sightingyearoffset = sightingyear - minyear;
    var knownyear = $.inArray(sightingyearoffset, markeryears)
    if (knownyear == -1) {
        birdsByYearOffset[sightingyearoffset] = [];
        markeryears.push(sightingyearoffset);
    }
    birdsByYearOffset[sightingyearoffset].push(bird);
}

function getMinAndMaxSightingYears(birdData) {
    
    birdData.forEach((bird) => {
        var sightingyear = parseInt(bird.sightingdatearray[0]);
        if (sightingyear < minyear) { minyear = sightingyear; }
        if (sightingyear > maxyear) { maxyear = sightingyear; }
    })
}

function getBirdId(bird) {
    return bird.id; // bird.momname.replace(/[^a-zA-Z0-9]/g,"");
}

function prepareBirdsByYearOffset(birdData) {
    getMinAndMaxSightingYears(birdData);
    birdData.map((bird) => { 
        updateBirdsData(bird);
    });
}

function getMinyear() {
    return minyear;
}

function getMaxyear() {
    return maxyear;
}

function getSelectedYear(inYearOffset) {
    if (!inYearOffset) inYearOffset = 0;
    return minyear + (yearOffset>0?yearOffset:inYearOffset);
}


function uppercasefirstLetter(string) 
{
    if (string && string.length>0)
        return string.charAt(0).toUpperCase() + string.slice(1);
    else
        return string;
}

function trimBirdName(birdname) {
    let trimmedname = birdname.replace(/[^a-zA-Z\-]/g," ").trim().toLowerCase();
    var birdwords = trimmedname.split(" ");
    return uppercasefirstLetter(birdwords[birdwords.length - 1]);
}

function getBirds() {
    return (_.sortBy(birdData, (bird) => {
        return trimBirdName(bird.momname)+bird.momname;
    }));
}

function updateBird(inBird) {
    let bird = _.find(birdData,(bird) => {
        return bird.id == inBird.id;
    });
    bird = Object.assign(bird, inBird);
}
function getBirdByBirdId(inBirdId) {
    return _.find(birdData,(bird) => {return bird.id == inBirdId;});
}

function resetBirdData() {
    markeryears = [];
    birdsByYearOffset = [];
    getMinAndMaxSightingYears(birdData);
    birdData.map((bird) => { 
        updateBirdsData(bird);
    });
}

function addBird(bird) {
   return birdDbManager.create(bird)
    .then(response => {
        log("Added Bird to DB: "+JSON.stringify(response))
        bird.id = response;
        birdData.push(bird);
        resetBirdData();
    });
}

function getBirdData() {
    return birdData;
}

function persistBird(bird) {
    birdDbManager.save(bird);
}


export default {
    initialize: initialize,
    getMinyear: getMinyear,
    getMaxyear: getMaxyear,
    getSelectedYear: getSelectedYear,
    getBirdsByYearOffset: getBirdsByYearOffset,
    getBirdId: getBirdId,
    getAllMarkerOptions: getAllMarkerOptions,
    getMarkerOptionsByYearOffset: getMarkerOptionsByYearOffset,
    getMarkerOptionsBySearchText: getMarkerOptionsBySearchText,
    getMarkerOptions: getMarkerOptions,
    getBirdsBySearchText: getBirdsBySearchText,
    getBirds: getBirds,
    getBirdData: getBirdData,
    convertBirdsListToMarkerOptionsList: convertBirdsListToMarkerOptionsList,
    trimBirdName: trimBirdName,
    updateBird: updateBird,
    getBirdByBirdId: getBirdByBirdId,
    addBird: addBird,
    persistBird: persistBird
}

/*
interface eventInterface
class event : eventInterface
    create

class eventTime
class eventMarker
class eventSearch
class project
class projectInvocation
    map
    currentDate
    projectDisplay
class projectDisplay
    events
class projectOwner
class projectEvents
*/