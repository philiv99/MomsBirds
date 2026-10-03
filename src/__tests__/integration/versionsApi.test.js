import versionsService from '../../services/versionsService.js';
import devConfig from '../../devconfig.js';

describe('Versions integration', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('fetches versions from the correct API endpoint', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        apiVersion: '1.0.0',
        databaseSchemaVersion: '1.0.0',
        apiReleaseNotes: [],
        databaseReleaseNotes: []
      })
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    const result = await versionsService.fetchVersions();

    expect(global.fetch).toHaveBeenCalledWith(`${devConfig.IGAPIURL}/Meta/version`);
    expect(result.success).toBe(true);
    expect(result.apiVersion).toBe('1.0.0');
  });

  it('returns success with all version data when API responds correctly', async () => {
    const mockData = {
      apiVersion: '1.0.1',
      databaseSchemaVersion: '1.0.0',
      apiReleaseNotes: [
        { version: '1.0.1', description: 'Bug fix' }
      ],
      databaseReleaseNotes: [
        { version: '1.0.0', description: 'Initial' }
      ]
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });

    const result = await versionsService.fetchVersions();

    expect(result.success).toBe(true);
    expect(result.apiVersion).toBe('1.0.1');
    expect(result.databaseSchemaVersion).toBe('1.0.0');
    expect(result.apiReleaseNotes).toHaveLength(1);
    expect(result.databaseReleaseNotes).toHaveLength(1);
  });

  it('returns failure with error message when API returns error status', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500
    });

    const result = await versionsService.fetchVersions();

    expect(result.success).toBe(false);
    expect(result.error).toContain('HTTP error');
  });

  it('returns failure when fetch throws an error', async () => {
    const testError = new Error('Network timeout');
    global.fetch.mockRejectedValueOnce(testError);

    const result = await versionsService.fetchVersions();

    expect(result.success).toBe(false);
    expect(result.error).toBe('Network timeout');
  });

  it('includes SPA version in response', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        apiVersion: '1.0.0',
        databaseSchemaVersion: '1.0.0'
      })
    });

    const result = await versionsService.fetchVersions();

    expect(result.spaVersion).toBeDefined();
    expect(result.spaVersion).toBe(process.env.REACT_APP_VERSION || '1.0.0');
  });

  it('handles empty release notes arrays', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        apiVersion: '1.0.0',
        databaseSchemaVersion: '1.0.0'
        // No release notes
      })
    });

    const result = await versionsService.fetchVersions();

    expect(result.success).toBe(true);
    expect(result.apiReleaseNotes).toEqual([]);
    expect(result.databaseReleaseNotes).toEqual([]);
  });

  it('reads camelCase JSON field names matching API [JsonProperty] serialization', async () => {
    // The .NET API uses [JsonProperty] attributes to emit camelCase.
    // If any field name is wrong here, apiVersion will be undefined and
    // the UI useEffect condition stays true, causing an infinite fetch loop.
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        apiVersion: '2.0.0',
        databaseSchemaVersion: '1.5.0',
        apiReleaseNotes: [{ version: '2.0.0', description: 'Major update' }],
        databaseReleaseNotes: [{ version: '1.5.0', description: 'Schema migration' }]
      })
    });

    const result = await versionsService.fetchVersions();

    expect(result.apiVersion).toBe('2.0.0');
    expect(result.databaseSchemaVersion).toBe('1.5.0');
    expect(result.apiReleaseNotes[0].version).toBe('2.0.0');
    expect(result.apiReleaseNotes[0].description).toBe('Major update');
    expect(result.databaseReleaseNotes[0].version).toBe('1.5.0');
  });

  it('returns undefined apiVersion when API incorrectly returns PascalCase fields', async () => {
    // Regression test: PascalCase from unpatched API causes infinite fetch loop in the UI.
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ApiVersion: '1.0.0', DatabaseSchemaVersion: '1.0.0' })
    });

    const result = await versionsService.fetchVersions();

    expect(result.apiVersion).toBeUndefined();
  });
});
