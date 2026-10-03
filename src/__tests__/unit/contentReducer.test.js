import content from '../../redux/reducers/content.js';
import initialContentState from '../../redux/reducers/initialContentState.js';
import contentEnums from '../../core/data/enums/contentEnums.js';
import * as types from '../../redux/actions/index.js';

describe('content reducer', () => {
    it('returns the initial state for an unknown action', () => {
        expect(content(undefined, { type: '@@INIT' })).toBe(initialContentState);
    });

    it('SET_CONTENT_PAGE_LIST switches the content page to the list page', () => {
        const state = content(initialContentState, { type: types.SET_CONTENT_PAGE_LIST });
        expect(state.contentPage).toBe(contentEnums.contentPage.LIST);
    });

    it('SET_CONTENT_PAGE_MAP switches the content page to the map page', () => {
        const state = content(initialContentState, { type: types.SET_CONTENT_PAGE_MAP });
        expect(state.contentPage).toBe(contentEnums.contentPage.MAP);
    });

    it('SCREEN_RESIZE stores the new dimensions', () => {
        const action = {
            type: types.SCREEN_RESIZE,
            footerHeight: 50,
            contentHeight: 600,
            contentWidth: 800,
            windowHeight: 650,
            windowWidth: 1000
        };
        const state = content(initialContentState, action);
        expect(state.windowWidth).toBe(1000);
        expect(state.contentHeight).toBe(600);
    });

    it('SET_CONTENT_FILTER stores the filter name and params', () => {
        const action = { type: types.SET_CONTENT_FILTER, filter: 'BYYEAR', params: { searchYear: 2020 } };
        const state = content(initialContentState, action);
        expect(state.filter).toEqual({ name: 'BYYEAR', params: { searchYear: 2020 } });
    });

    it('UPDATE_BIRD_LOCATION_SUCCESS updates the matching item marker coordinates', () => {
        const seeded = {
            ...initialContentState,
            items: [
                { marker: { id: 1, lat: 0, lng: 0 } },
                { marker: { id: 2, lat: 10, lng: 10 } }
            ]
        };
        const action = types.updateBirdLocationSuccess(2, 42, -71);
        const state = content(seeded, action);
        expect(state.items[1].marker.lat).toBe(42);
        expect(state.items[1].marker.lng).toBe(-71);
        expect(state.items[0].marker.lat).toBe(0);
    });
});
