
var windowHeight = $(window).height();
function getWindowHeight() {
    return Math.floor(windowHeight);
}
function getContentHeight() {
    return Math.floor(windowHeight*0.85);
}
    
var windowWidth = $(window).width();
function getWindowWidth() {
    return Math.floor(windowWidth);
}
function getContentWidth() {
    return Math.floor(windowWidth*0.85);
}

export default { 
    windowHeight: windowHeight,
    windowWidth: windowWidth,
    getContentHeight: getContentHeight,
    getContentWidth: getContentWidth,
    getWindowWidth: getWindowWidth,
    getWindowHeight: getWindowHeight
    
 }