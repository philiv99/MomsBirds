import * as types from '../actions/index.js';
import birdLocationService from '../../services/birdLocationService.js';
import { updateBirdLocationSuccess, updateBirdLocationFailure } from '../actions/index.js';

/**
 * Middleware for handling bird location update API calls
 * @param {Object} store - Redux store
 */
const birdLocationMiddleware = store => next => action => {
  // Pass the action to the next middleware/reducer in the chain
  const result = next(action);
  
  // Check if this is a bird location update action
  if (action.type === types.UPDATE_BIRD_LOCATION) {
    const { id, updatedBird } = action.payload;
    
    // Make the API call to update the bird location
    birdLocationService.updateBirdLocation(id, updatedBird)
      .then(() => {
        // Dispatch success action with the updated coordinates
        store.dispatch(updateBirdLocationSuccess(
          id, 
          updatedBird.sightinglat || updatedBird.lat,
          updatedBird.sightinglng || updatedBird.lng
        ));
      })
      .catch(error => {
        // Dispatch failure action with the error
        store.dispatch(updateBirdLocationFailure(id, error));
      });
  }
  
  return result;
};

export default birdLocationMiddleware;