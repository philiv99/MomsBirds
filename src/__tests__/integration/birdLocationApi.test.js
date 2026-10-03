/**
 * @jest-environment node
 */
import config from 'config';
import birdLocationService from '../../services/birdLocationService.js';

// Integration test for the API service boundary. We stub global fetch so the test
// is hermetic while still exercising the real service: URL construction from the
// webpack `config` alias, request shape, JSON parsing, and error handling.
describe('birdLocationService integration', () => {
    let fetchMock;

    beforeEach(() => {
        fetchMock = jest.fn();
        global.fetch = fetchMock;
    });

    afterEach(() => {
        jest.restoreAllMocks();
        delete global.fetch;
    });

    it('resolves the dev API base URL from the config alias', () => {
        expect(config.IGAPIURL).toBe('http://localhost:10152/api');
    });

    it('PUTs an updated sighting to the resolved base URL and returns the payload', async () => {
        const payload = { id: 223, sightinglat: 42, sightinglng: -71 };
        fetchMock.mockResolvedValue({ ok: true, json: async () => payload });

        const result = await birdLocationService.updateBirdLocation(223, {
            sightinglat: 42,
            sightinglng: -71
        });

        expect(result).toEqual(payload);
        const [url, options] = fetchMock.mock.calls[0];
        expect(url).toBe('http://localhost:10152/api/BirdSighting/223');
        expect(options.method).toBe('PUT');
        expect(JSON.parse(options.body)).toEqual({ sightinglat: 42, sightinglng: -71 });
    });

    it('throws when the API responds with an error status', async () => {
        fetchMock.mockResolvedValue({ ok: false, status: 500, json: async () => ({}) });

        await expect(
            birdLocationService.updateBirdLocation(1, { sightinglat: 0, sightinglng: 0 })
        ).rejects.toThrow('API returned 500');
    });
});
