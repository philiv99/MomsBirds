
import React from 'react';
import { renderToString } from 'react-dom/server'
import _ from 'underscore'
import Marker from "../../../components/Marker/Marker.jsx";
import BirdCard from "../../../components/BirdCard/BirdCard.jsx";

function projectBirdSighting(bird) {
    let returnBird = null;
    if (bird && bird.id) {
        const sightingDate = new Date(bird.sightingdate);
        const formatted_date = sightingDate.getFullYear() + "/" + (sightingDate.getMonth() + 1) + "/" + sightingDate.getDate();
        returnBird = { 
            ...bird,
            type: contentEnums.types.BIRD_SIGHTING,
            lat: bird.sightinglat,
            lng: bird.sightinglng,
            sightingdate : formatted_date,
            sightingdatearray : [ 
                sightingDate.getFullYear(), 
                sightingDate.getMonth(), 
                sightingDate.getDay(), 
            ]
        }
    }
    return returnBird;
}

function projectBirdSightings(birdSightings)
{
    var birdSightingsProjection = [];
    birdSightings.forEach(function (birdSighting) {
        birdSightingsProjection.push(projectBirdSighting(birdSighting));
    })
    return birdSightingsProjection;
}

let markerElementId = "newMarkerElement";
let getNewMarkerElement = () => { return $(`#${markerElementId}`).clone().get();}
let methods = {
    renderMarker: function(bird) {
        return {
            id: bird.id,
            el: getNewMarkerElement(),
            lat: bird.sightinglat,
            lng: bird.sightinglng,
            popupHTML: renderToString(<Marker bird={bird} id={bird.id}/>)
        } 
    },
    renderTab: function(bird){
        return {
            title: bird.momname,
            command: bird.utterance,
            content: <BirdCard status={bird.status} bird={bird} birdUpdated={this.birdUpdated} cardId={bird.id}></BirdCard>
        } 
    },
    renderCard: function(bird) {
        return "bird card for "+bird.momname;
    },
}

export default {
    methods: methods,
    projectBirdSightings: projectBirdSightings,
    projectBirdSighting: projectBirdSighting
}