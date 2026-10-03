import * as actions from '../../redux/actions/index.js';

describe('version action creators', () => {
  it('toggleVersionsModal returns a TOGGLE_VERSIONS_MODAL action', () => {
    expect(actions.toggleVersionsModal()).toEqual({
      type: actions.TOGGLE_VERSIONS_MODAL
    });
  });

  it('fetchVersions returns a FETCH_VERSIONS action', () => {
    expect(actions.fetchVersions()).toEqual({
      type: actions.FETCH_VERSIONS
    });
  });

  it('fetchVersionsSuccess carries version data in payload', () => {
    const versionData = {
      spaVersion: '1.0.0',
      apiVersion: '1.0.0',
      databaseSchemaVersion: '1.0.0',
      apiReleaseNotes: [],
      databaseReleaseNotes: []
    };
    expect(actions.fetchVersionsSuccess(versionData)).toEqual({
      type: actions.FETCH_VERSIONS_SUCCESS,
      payload: versionData
    });
  });

  it('fetchVersionsFailure carries error message in payload', () => {
    const error = new Error('Network error');
    expect(actions.fetchVersionsFailure(error)).toEqual({
      type: actions.FETCH_VERSIONS_FAILURE,
      payload: {
        error: 'Network error'
      }
    });
  });

  it('fetchVersionsFailure handles errors without message property', () => {
    expect(actions.fetchVersionsFailure({})).toEqual({
      type: actions.FETCH_VERSIONS_FAILURE,
      payload: {
        error: 'Failed to fetch versions'
      }
    });
  });
});
