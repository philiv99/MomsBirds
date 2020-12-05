import witai from "./witai.js";

function getApp(name) {
    return witai.getApp(name)
    .then(res => console.log(JSON.stringify(res,null,4)));
}

function getApps() {
    return witai.getApps()
    .then(res => console.log(JSON.stringify(res,null,4)));
}

function addApp(name) {
    return witai.getApps()
    .then(res => console.log(JSON.stringify(res,null,4)));
}

function deleteApp(name) {
    return witai.deleteApp(name)
        .then(res => console.log(JSON.stringify(res,null,4)));
}
function interpret(utterance) {
    return witai.interpretBirdInfo(utterance)
        .then(json => {
            console.log(JSON.stringify(json,null,4)); 
        })
}

export default {
    getApp:   getApp,
    getApps:   getApps,
    addApp:    addApp,
    deleteApp: deleteApp,
    interpret: interpret
}