
import contentEnums from '../../core/data/enums/contentEnums.js';
import windowDimensions from '../../core/util/windowdemensions'
export default {
    helpItem: {
        Id: 0,
        Type: contentEnums.types.STATIC,
        Status: contentEnums.statuses.STATIC,
        Data: null,
        Header: 'Help',
        Content: 'Help'
    },
    editItems: [],
    contentPage: contentEnums.contentPage.MAP,
    filters: [],
    sortBy: '',
    selectedItemId: 0,
    selectedBirdOnMapId: null,
    mapFlyToSeq: 0,
    items: [],
    minYear: 3000,
    maxYear: 0,
    selectedYear: 0,
    isShowAllYears: true,
    isDataLoaded: false,
    footerHeight: windowDimensions.getFooterHeight(),
    contentHeight: windowDimensions.getContentHeight(),
    contentWidth: windowDimensions.getContentWidth(),
    windowHeight: windowDimensions.getWindowHeight(),
    windowWidth: windowDimensions.getWindowWidth()
}