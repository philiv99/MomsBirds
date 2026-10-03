import config from 'config';

class VersionsService {
  async fetchVersions() {
    try {
      const endpoint = `${config.IGAPIURL}/Meta/version`;
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        success: true,
        apiVersion: data.apiVersion,
        databaseSchemaVersion: data.databaseSchemaVersion,
        apiReleaseNotes: data.apiReleaseNotes || [],
        databaseReleaseNotes: data.databaseReleaseNotes || [],
        spaVersion: process.env.REACT_APP_VERSION || '1.0.0'
      };
    } catch (error) {
      console.error('Error fetching versions:', error);
      return {
        success: false,
        error: error.message,
        spaVersion: process.env.REACT_APP_VERSION || '1.0.0'
      };
    }
  }
}

export default new VersionsService();
