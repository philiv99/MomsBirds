
import contentEnums from '../../core/data/enums/contentEnums.js';
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
    items: [],
    minYear: 3000,
    maxYear: 0,
    selectedYear: 0,
    isShowAllYears: false,
    isDataLoaded: false
}