import versionsReducer from '../../redux/reducers/versions.js';
import * as actions from '../../redux/actions/index.js';

describe('versions reducer', () => {
  const initialState = {
    showModal: false,
    isLoading: false,
    spaVersion: '1.0.0',
    apiVersion: null,
    databaseSchemaVersion: null,
    apiReleaseNotes: [],
    databaseReleaseNotes: [],
    error: null,
    lastFetchTime: null
  };

  it('returns initial state by default', () => {
    expect(versionsReducer(undefined, {})).toEqual(initialState);
  });

  it('TOGGLE_VERSIONS_MODAL toggles showModal', () => {
    let state = versionsReducer(initialState, actions.toggleVersionsModal());
    expect(state.showModal).toBe(true);
    expect(state).toEqual({ ...initialState, showModal: true });

    state = versionsReducer(state, actions.toggleVersionsModal());
    expect(state.showModal).toBe(false);
  });

  it('FETCH_VERSIONS sets isLoading to true and clears error', () => {
    const stateWithError = { ...initialState, error: 'Some error' };
    const state = versionsReducer(stateWithError, actions.fetchVersions());
    
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('FETCH_VERSIONS_SUCCESS updates versions and clears error', () => {
    const versionData = {
      spaVersion: '1.0.0',
      apiVersion: '1.0.1',
      databaseSchemaVersion: '1.0.0',
      apiReleaseNotes: [{ version: '1.0.1', description: 'Bug fix' }],
      databaseReleaseNotes: []
    };

    const state = versionsReducer(
      { ...initialState, isLoading: true },
      actions.fetchVersionsSuccess(versionData)
    );

    expect(state.isLoading).toBe(false);
    expect(state.apiVersion).toBe('1.0.1');
    expect(state.databaseSchemaVersion).toBe('1.0.0');
    expect(state.apiReleaseNotes).toEqual([{ version: '1.0.1', description: 'Bug fix' }]);
    expect(state.error).toBe(null);
    expect(state.lastFetchTime).toBeInstanceOf(Date);
  });

  it('FETCH_VERSIONS_FAILURE sets error and isLoading to false', () => {
    const error = new Error('Network failed');
    const state = versionsReducer(
      { ...initialState, isLoading: true },
      actions.fetchVersionsFailure(error)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Network failed');
  });

  it('FETCH_VERSIONS_SUCCESS handles empty release notes', () => {
    const versionData = {
      spaVersion: '1.0.0',
      apiVersion: '1.0.0',
      databaseSchemaVersion: '1.0.0'
      // No release notes provided
    };

    const state = versionsReducer(
      initialState,
      actions.fetchVersionsSuccess(versionData)
    );

    expect(state.apiReleaseNotes).toEqual([]);
    expect(state.databaseReleaseNotes).toEqual([]);
  });
});
