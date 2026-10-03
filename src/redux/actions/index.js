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
export const SCREEN_RESIZE = 'SCREEN_RESIZE';
export const TOGGLE_ALL_YEARS = 'TOGGLE_ALL_YEARS';
export const UPDATE_BIRD_LOCATION = 'UPDATE_BIRD_LOCATION';
export const UPDATE_BIRD_LOCATION_SUCCESS = 'UPDATE_BIRD_LOCATION_SUCCESS';
export const UPDATE_BIRD_LOCATION_FAILURE = 'UPDATE_BIRD_LOCATION_FAILURE';
export const TOGGLE_VERSIONS_MODAL = 'TOGGLE_VERSIONS_MODAL';
export const FETCH_VERSIONS = 'FETCH_VERSIONS';
export const FETCH_VERSIONS_SUCCESS = 'FETCH_VERSIONS_SUCCESS';
export const FETCH_VERSIONS_FAILURE = 'FETCH_VERSIONS_FAILURE';

export const getContent = () => ({
    type: GET_CONTENT
})

export const setContentFilter = (filter, params) => ({
    type: SET_CONTENT_FILTER,
    filter,
    params
})

export const mapFlyTo = (item) => ({
    type: MAP_FLY_TO,
    item
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

export const resizeWindow = () => ({
    type: SET_CONTENT_PAGE_LIST
})

export function screenResize(footerHeight, contentHeight, contentWidth, windowHeight, windowWidth) {
    return {
        type: SCREEN_RESIZE,
        footerHeight: footerHeight,
        contentHeight: contentHeight,
        contentWidth: contentWidth,
        windowHeight: windowHeight,
        windowWidth: windowWidth
    };
}

/**
 * Action creator for initiating a bird location update
 * @param {number} id - The bird ID
 * @param {Object} updatedBird - The updated bird object with new location
 */
export const updateBirdLocation = (id, updatedBird) => ({
    type: UPDATE_BIRD_LOCATION,
    payload: {
        id,
        updatedBird
    }
});

/**
 * Action creator for successful bird location update
 * @param {number} id - The bird ID
 * @param {number} lat - Updated latitude
 * @param {number} lng - Updated longitude
 */
export const updateBirdLocationSuccess = (id, lat, lng) => ({
    type: UPDATE_BIRD_LOCATION_SUCCESS,
    payload: {
        id,
        lat,
        lng
    }
});

/**
 * Action creator for failed bird location update
 * @param {number} id - The bird ID
 * @param {Error} error - The error that occurred
 */
export const updateBirdLocationFailure = (id, error) => ({
    type: UPDATE_BIRD_LOCATION_FAILURE,
    payload: {
        id,
        error
    }
});

/**
 * Action creator for toggling the versions modal visibility
 */
export const toggleVersionsModal = () => ({
    type: TOGGLE_VERSIONS_MODAL
});

/**
 * Action creator for initiating version fetch
 */
export const fetchVersions = () => ({
    type: FETCH_VERSIONS
});

/**
 * Action creator for successful version fetch
 * @param {Object} versionData - The version information
 */
export const fetchVersionsSuccess = (versionData) => ({
    type: FETCH_VERSIONS_SUCCESS,
    payload: versionData
});

/**
 * Action creator for failed version fetch
 * @param {Error} error - The error that occurred
 */
export const fetchVersionsFailure = (error) => ({
    type: FETCH_VERSIONS_FAILURE,
    payload: {
        error: error.message || 'Failed to fetch versions'
    }
});
