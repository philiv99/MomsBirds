import _ from 'underscore';
import initialContentState from './initialContentState.js';
import ContentEnums from '../../core/data/enums/contentEnums.js';
import contentService from '../../services/contentService.js'
import * as types from '../actions/index.js'
import mapMgr from '../../services/mapmanager.js';
import contentEnums from '../../core/data/enums/contentEnums.js';
import birdLocationService from '../../services/birdLocationService.js';

const content = (state = initialContentState, action) => {
    let items = [];
    let filters = [];
    let sortBy = 'momname';
    switch (action.type) {
        
        case types.SEARCH_BY_TEXT:
            filters = state.filters;
            if (action.searchText == '') 
                filters = removeFilter(filters, ContentEnums.filters.BYSEARCHTEXT);
            else 
                filters = updateFilters(filters, {
                        name: ContentEnums.filters.BYSEARCHTEXT,
                        params: {
                            searchText: action.searchText,
                            searchFields: ['address', 'description', 'momname', 'propername']
                        }
                    });
            items = contentService.getItemsByFilters(filters, sortBy);
            return { ...state, 
                items: items, 
                filters: filters,
                sortBy: sortBy};

        case types.SEARCH_BY_YEAR:
            filters = state.filters;
            filters = updateFilters(filters, {
                name: ContentEnums.filters.BYYEAR,
                params: {
                    searchYear: action.searchYear,
                    searchFields: ['sightingdate'],
                }
            });
            items = contentService.getItemsByFilters(filters, sortBy);
            return { ...state, 
                items: items, 
                filters: filters,
                selectedYear: action.searchYear,
                sortBy: sortBy,
                isShowAllYears: false};

        case types.GET_CONTENT:
            filters = [];
            items = contentService.getItemsByFilters(filters, sortBy);
            return   { ...state, 
                items: items, 
                minYear: contentService.getMinyear(),
                maxYear: contentService.getMaxyear(), 
                selectedYear: contentService.getMinyear(),
                filters: filters,
                sortBy: sortBy,
                isShowAllYears: true,
                isDataLoaded: true
            };
                
        case types.TOGGLE_ALL_YEARS:
            filters = state.filters;
            let newIsShowAllYears = !state.isShowAllYears;
            if (newIsShowAllYears) {
                filters = removeFilter(filters, ContentEnums.filters.BYYEAR);
            } else { 
                filters = updateFilters(filters, {
                    name: ContentEnums.filters.BYYEAR,
                    params: {
                        searchYear: state.selectedYear,
                        searchFields: ['sightingdate'],
                    }
                });
            }
            items = contentService.getItemsByFilters(filters, sortBy);
            return   { ...state, 
                items: items, 
                filters: filters,
                sortBy: sortBy,
                isShowAllYears: newIsShowAllYears};

        case types.SET_CONTENT_FILTER:
            return { ...state, filter: {name: action.filter, params: action.params }}; 

        case types.ADD_CONTENT:
            items = state.items;
            items.push( action.item )
            return { ...state, items: items };

        case types.MAP_FLY_TO:
            mapMgr.flyToItem(action.item);
            return {
                ...state,
                selectedBirdOnMapId: action.item && action.item.data ? action.item.data.id : null,
                mapFlyToSeq: (state.mapFlyToSeq || 0) + 1
            };

        case types.MAP_FIT_BOUNDS:
            mapMgr.fitBounds(item);
            return state;

        case types.EDIT_ITEM:
            let editItems = state.editItems;
            let editItemIndex = _.findIndex(editItems, (item) => { return item.id == action.itemId});
            if (editItemIndex == -1) {
                editItems.push(contentService.getItemById(action.itemId));
            }
            return { ...state, editItems: editItems };
            
        case types.SET_CONTENT_PAGE_MAP:
            return { ...state, contentPage: contentEnums.contentPage.MAP };
        
        case types.SET_CONTENT_PAGE_LIST:
            return { ...state, contentPage: contentEnums.contentPage.LIST };

        case types.UPDATE_BIRD_LOCATION_SUCCESS:
            const { id, lat, lng } = action.payload;
            return {
                ...state,
                items: state.items.map(item => {
                    // Check if this is the item we need to update
                    if (item.marker && item.marker.id === id) {
                        return {
                            ...item,
                            marker: {
                                ...item.marker,
                                lat: lat,
                                lng: lng
                            }
                        };
                    }
                    return item;
                })
            };
        
        case types.UPDATE_BIRD_LOCATION_FAILURE:
            // Could add error handling state here if needed
            console.error('Failed to update bird location:', action.payload.error);
            return state;

        case types.SCREEN_RESIZE:
            return Object.assign({}, state, {
                footerHeight:  action.footerHeight,
                contentHeight: action.contentHeight,
                contentWidth: action.contentWidth,
                windowHeight: action.windowHeight,
                windowWidth: action.windowWidth
            });

        default:
            return state
    }
}

function updateFilters(filters, filter) {
    let newFilters = [];
    let filtersToRemove = [filter.name, ContentEnums.filters.GET_CONTENT];
    let oldFilters = _.filter(filters, (fltr) => {
        return !filtersToRemove.includes(fltr.name);
    })
    if (oldFilters) newFilters = oldFilters;
    newFilters.push(filter);
    return newFilters;
}

function removeFilter(filters, filterToRemove) {
    return  _.filter(filters, (fltr) => {
        return fltr.name != filterToRemove;
    })
}
  
export default content