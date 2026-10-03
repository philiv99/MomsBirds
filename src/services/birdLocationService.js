import config from "config";

/**
 * Service to handle bird location API operations
 */
export default {
  /**
   * Updates a bird sighting location via API
   * @param {number} birdId - The ID of the bird sighting to update
   * @param {Object} updatedBird - The bird object with updated properties
   * @returns {Promise} - Promise resolving to the updated bird data
   */
  updateBirdLocation: async (birdId, updatedBird) => {
    try {
      const response = await fetch(`${config.IGAPIURL}/BirdSighting/${birdId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedBird)
      });
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating bird location:', error);
      throw error;
    }
  }
};