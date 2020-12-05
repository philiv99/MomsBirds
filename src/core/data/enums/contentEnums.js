const statuses = {
    STATIC: 0,
    NEW: 1,
    INSYNC: 2,
    EDITED: 3
};

const componentNames = {    
    BirdsByYearComponent: "BirdsByYearContent",
    BirdsByTextSearchComponent: "BirdsByTextSearchContent",
    AllBirdsComponent: "AllBirdsContent"
}

const types = {
    STATIC: 'static',
    BIRDSIGHTING: 'birdsighting'
}

const filters = {
    NONE: "None",
    BYYEAR: "ByYear",
    BYSEARCHTEXT: "BySearchText"
}

const contentPage = {
    MAP: "Map",
    LIST: "List"
}

export default {
    statuses: statuses,
    componentNames: componentNames,
    filters: filters,
    types: types,
    contentPage: contentPage
}