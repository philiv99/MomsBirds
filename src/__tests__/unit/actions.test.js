import * as actions from '../../redux/actions/index.js';

describe('action creators', () => {
    it('getContent returns a GET_CONTENT action', () => {
        expect(actions.getContent()).toEqual({ type: actions.GET_CONTENT });
    });

    it('setContentFilter carries the filter and params', () => {
        const params = { searchText: 'robin' };
        expect(actions.setContentFilter('BYSEARCHTEXT', params)).toEqual({
            type: actions.SET_CONTENT_FILTER,
            filter: 'BYSEARCHTEXT',
            params
        });
    });

    it('searchByText maps text to searchText', () => {
        expect(actions.searchByText('jay')).toEqual({
            type: actions.SEARCH_BY_TEXT,
            searchText: 'jay'
        });
    });

    it('searchByYear maps year to searchYear', () => {
        expect(actions.searchByYear(2021)).toEqual({
            type: actions.SEARCH_BY_YEAR,
            searchYear: 2021
        });
    });

    it('mapFlyTo carries the item', () => {
        const item = { data: { id: 7 } };
        expect(actions.mapFlyTo(item)).toEqual({ type: actions.MAP_FLY_TO, item });
    });

    it('screenResize captures all dimensions', () => {
        expect(actions.screenResize(50, 600, 800, 650, 1000)).toEqual({
            type: actions.SCREEN_RESIZE,
            footerHeight: 50,
            contentHeight: 600,
            contentWidth: 800,
            windowHeight: 650,
            windowWidth: 1000
        });
    });

    it('updateBirdLocation nests id and updatedBird in payload', () => {
        const updatedBird = { sightinglat: 42, sightinglng: -71 };
        expect(actions.updateBirdLocation(223, updatedBird)).toEqual({
            type: actions.UPDATE_BIRD_LOCATION,
            payload: { id: 223, updatedBird }
        });
    });

    it('updateBirdLocationSuccess carries coordinates', () => {
        expect(actions.updateBirdLocationSuccess(223, 42, -71)).toEqual({
            type: actions.UPDATE_BIRD_LOCATION_SUCCESS,
            payload: { id: 223, lat: 42, lng: -71 }
        });
    });

    it('updateBirdLocationFailure carries the error', () => {
        const error = new Error('boom');
        expect(actions.updateBirdLocationFailure(223, error)).toEqual({
            type: actions.UPDATE_BIRD_LOCATION_FAILURE,
            payload: { id: 223, error }
        });
    });
});
