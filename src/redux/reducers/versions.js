import {
  TOGGLE_VERSIONS_MODAL,
  FETCH_VERSIONS,
  FETCH_VERSIONS_SUCCESS,
  FETCH_VERSIONS_FAILURE
} from '../actions/index.js';

const initialVersionState = {
  showModal: false,
  isLoading: false,
  spaVersion: process.env.REACT_APP_VERSION || '1.0.0',
  apiVersion: null,
  databaseSchemaVersion: null,
  apiReleaseNotes: [],
  databaseReleaseNotes: [],
  error: null,
  lastFetchTime: null
};

export default function versions(state = initialVersionState, action) {
  switch (action.type) {
    case TOGGLE_VERSIONS_MODAL:
      return {
        ...state,
        showModal: !state.showModal
      };
    
    case FETCH_VERSIONS:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    
    case FETCH_VERSIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        apiVersion: action.payload.apiVersion,
        databaseSchemaVersion: action.payload.databaseSchemaVersion,
        apiReleaseNotes: action.payload.apiReleaseNotes || [],
        databaseReleaseNotes: action.payload.databaseReleaseNotes || [],
        spaVersion: action.payload.spaVersion || state.spaVersion,
        error: null,
        lastFetchTime: new Date()
      };
    
    case FETCH_VERSIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    
    default:
      return state;
  }
}
