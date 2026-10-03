import versionsReducer from '../../redux/reducers/versions.js';
import * as versionsActions from '../../redux/actions/index.js';

describe('VersionsModal reducer integration', () => {
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

  it('opens modal when toggleVersionsModal is called', () => {
    let state = versionsReducer(initialState, versionsActions.toggleVersionsModal());
    expect(state.showModal).toBe(true);
  });

  it('closes modal when toggleVersionsModal is called twice', () => {
    let state = versionsReducer(initialState, versionsActions.toggleVersionsModal());
    state = versionsReducer(state, versionsActions.toggleVersionsModal());
    expect(state.showModal).toBe(false);
  });

  it('tracks loading state during version fetch', () => {
    let state = versionsReducer(initialState, versionsActions.fetchVersions());
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('updates state when versions successfully fetched', () => {
    const versionData = {
      spaVersion: '1.0.0',
      apiVersion: '1.0.1',
      databaseSchemaVersion: '1.0.0',
      apiReleaseNotes: [{ version: '1.0.1', description: 'Bug fix' }],
      databaseReleaseNotes: []
    };

    let state = versionsReducer(initialState, versionsActions.fetchVersions());
    state = versionsReducer(state, versionsActions.fetchVersionsSuccess(versionData));

    expect(state.isLoading).toBe(false);
    expect(state.apiVersion).toBe('1.0.1');
    expect(state.apiReleaseNotes).toHaveLength(1);
    expect(state.error).toBeNull();
  });

  it('sets error when fetch fails', () => {
    const error = new Error('Network error');
    
    let state = versionsReducer(initialState, versionsActions.fetchVersions());
    state = versionsReducer(state, versionsActions.fetchVersionsFailure(error));

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Network error');
  });

  it('displays SPA version even when API call fails', () => {
    const error = new Error('API unavailable');
    
    let state = versionsReducer(initialState, versionsActions.fetchVersions());
    state = versionsReducer(state, versionsActions.fetchVersionsFailure(error));

    expect(state.spaVersion).toBe('1.0.0');
    expect(state.error).toBe('API unavailable');
  });

  it('preserves SPA version on successful fetch', () => {
    const versionData = {
      spaVersion: '1.0.0',
      apiVersion: '1.0.1',
      databaseSchemaVersion: '1.0.0'
    };

    let state = versionsReducer(initialState, versionsActions.fetchVersions());
    state = versionsReducer(state, versionsActions.fetchVersionsSuccess(versionData));

    expect(state.spaVersion).toBe('1.0.0');
  });
});
