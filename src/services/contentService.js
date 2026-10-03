
import _ from 'underscore'
import moment from 'moment';
import birdDbManager from "../core/managers/birdDbManager";
import contentEnums from "../core/data/enums/contentEnums";
import log from '../core/util/log.js'
import birdSightingProjection from '../core/data/projections/birdSightingProjection';
    
let minyear = 3000;
let maxyear = 0;
let itemData = null;

function getMinyear() {
    return minyear;
}

function getMaxyear() {
    return maxyear;
}

function saveItem(inItem) {
    let item = _.find(itemData,(item) => {
        return item.id == inItem.id;
    });
    item = Object.assign(item, inItem);
}

function getItemById(inItemId) {
    let item = _.find(itemData,(item) => {return item.id == inItemId;});
    switch(item.type) {
        case contentEnums.types.BIRDSIGHTING:
            return projectItem(item, birdSightingProjection.methods);
        default: return null; 
    }
}

function addItem(item) {
   return birdDbManager.create(item)
        .then(response => {
            log("Added Bird to DB: "+JSON.stringify(response))
            item.id = response;
            itemData.push(item);
        });
}

function getMinAndMaxYears(items) {   
    items.forEach((item) => {
        var sightingdatearray =  moment(item.sightingdate).format('YYYY/MM/DD').split('/');
        var sightingyear = parseInt(sightingdatearray[0]);
        if (sightingyear < minyear) { minyear = sightingyear; }
        if (sightingyear > maxyear) { maxyear = sightingyear; }
    })
}

function filterBySearchText(items, params) {
    let returnItems = [];
    if (params && params.searchText && params.searchText != "") {
        let normalizedSearchText = params.searchText.toLowerCase();
        returnItems = _.filter(items,(item) => {
            const reducer = (wasFound, itemPropertyName) => {
                const propertyValue = item[itemPropertyName];
                let isFound = false;
                if (propertyValue) isFound = propertyValue.toLowerCase().includes(normalizedSearchText);
                return wasFound || isFound
            };
            return (params.searchFields.reduce(reducer, false))
        })
    } 
    return returnItems;
}

function filterByYear(items, params) {
    let returnItems = [];
    if (params && params.searchYear && params.searchYear != "") {
        returnItems = _.filter(items,(item) => {
                return moment(item.sightingdate).isSame(`${params.searchYear}-01-01`, 'year'); 
        });
    } 
    return returnItems;
}

function sortItems(items, sortBy) {
    let returnItems = items;
    if (items && items.length>=1) {
        if (sortBy) 
            returnItems = _.sortBy(items, sortBy);
    }
    return returnItems;
}

function projectItem(item, methods) {
    return {
        id: item.id,
        type: item.type,
        status: contentEnums.statuses.INSYNC,
        data: item,
        marker: methods.renderMarker(item),
        tab: methods.renderTab(item),
        card: methods.renderCard(item) 
    };
}

function assembleContentItems(items) {
    getMinAndMaxYears(items);
    return items.map(item => {
        switch(item.type) {
            case contentEnums.types.BIRDSIGHTING:
                return projectItem(item, birdSightingProjection.methods);
            default: return null; 
        }
    });
}

function getItemsByFilters(filters, sortBy){
    let items = itemData;
    filters.forEach(filter => {
        switch(filter.name) {
            case contentEnums.filters.BYSEARCHTEXT:
                items = filterBySearchText(items, filter.params);
                break;
            case contentEnums.filters.BYYEAR:
                items = filterByYear(items, filter.params);
                break;
        }     
    });
    
    items = sortItems(items, sortBy);
    return assembleContentItems(items);
}

function initialize() {
    return birdDbManager.loadAll()
        .then(data => { 
            itemData = data; 
        });
}

export default {
    initialize: initialize,
    getMinyear: getMinyear,
    getMaxyear: getMaxyear,

    getItemsByFilters: getItemsByFilters,
    getItemById: getItemById,
    
    addItem: addItem,
    //deleteItem: deleteItem,
    saveItem: saveItem

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