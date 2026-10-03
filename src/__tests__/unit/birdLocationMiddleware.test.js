import birdLocationMiddleware from '../../redux/middleware/birdLocationMiddleware.js';
import birdLocationService from '../../services/birdLocationService.js';
import * as types from '../../redux/actions/index.js';

jest.mock('../../services/birdLocationService.js');

function runMiddleware(action) {
    const store = { dispatch: jest.fn() };
    const next = jest.fn(a => a);
    const result = birdLocationMiddleware(store)(next)(action);
    return { store, next, result };
}

describe('birdLocationMiddleware', () => {
    afterEach(() => jest.clearAllMocks());

    it('passes unrelated actions straight through without calling the service', () => {
        const action = { type: types.GET_CONTENT };
        const { next, store, result } = runMiddleware(action);

        expect(next).toHaveBeenCalledWith(action);
        expect(result).toBe(action);
        expect(birdLocationService.updateBirdLocation).not.toHaveBeenCalled();
        expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('dispatches success with coordinates when the service resolves', async () => {
        birdLocationService.updateBirdLocation.mockResolvedValue({});
        const action = types.updateBirdLocation(223, { sightinglat: 42, sightinglng: -71 });

        const { store } = runMiddleware(action);
        await Promise.resolve();
        await Promise.resolve();

        expect(birdLocationService.updateBirdLocation).toHaveBeenCalledWith(223, { sightinglat: 42, sightinglng: -71 });
        expect(store.dispatch).toHaveBeenCalledWith(types.updateBirdLocationSuccess(223, 42, -71));
    });

    it('dispatches failure when the service rejects', async () => {
        const error = new Error('network');
        birdLocationService.updateBirdLocation.mockRejectedValue(error);
        const action = types.updateBirdLocation(9, { lat: 1, lng: 2 });

        const { store } = runMiddleware(action);
        await Promise.resolve();
        await Promise.resolve();

        expect(store.dispatch).toHaveBeenCalledWith(types.updateBirdLocationFailure(9, error));
    });
});
