export const GET_CONTENT = 'GET_CONTENT';
export const SET_CONTENT_FILTER = 'SET_CONTENT_FILTER';
export const MAP_FLY_TO = 'MAP_FLY_TO';
export const MAP_FIT_BOUNDS = 'MAP_FIT_BOUNDS';
export const EDIT_ITEM = 'EDIT_ITEM';
export const ADD_CONTENT = 'ADD_CONTENT';
export const SEARCH_BY_TEXT = 'SEARCH_BY_TEXT';
export const SEARCH_BY_YEAR = 'SEARCH_BY_YEAR';
export const SET_CONTENT_PAGE_MAP = 'SET_CONTENT_PAGE_MAP';
export const SET_CONTENT_PAGE_LIST = 'SET_CONTENT_PAGE_LIST';

export const TOGGLE_ALL_YEARS = 'TOGGLE_ALL_YEARS';

export const getContent = () => ({
    type: GET_CONTENT
})

export const setContentFilter = (filter, params) => ({
    type: SET_CONTENT_FILTER,
    filter,
    params
})

export const mapFlyTo = (markerid) => ({
    type: MAP_FLY_TO,
    markerid
})

export const mapFitBounds = () => ({
    type: MAP_FIT_BOUNDS
})

export const editItem = (itemId) => ({
    type: EDIT_ITEM,
    itemId
})

export const addContent = (item) => ({
    type: ADD_CONTENT,
    item
})

export const searchByText = (text) => ({
    type: SEARCH_BY_TEXT,
    searchText: text
})

export const searchByYear = (year) => ({
    type: SEARCH_BY_YEAR,
    searchYear: year
})

export const toggleAllYears = () => ({
    type: TOGGLE_ALL_YEARS
})

export const setContentPageMap = () => ({
    type: SET_CONTENT_PAGE_MAP
})

export const setContentPageList = () => ({
    type: SET_CONTENT_PAGE_LIST
})