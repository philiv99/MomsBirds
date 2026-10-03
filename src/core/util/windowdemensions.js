
function getWindowHeight() {
    var windowHeight = $(window).height();
    return Math.floor(windowHeight);
}
function getContentHeight() {
    var windowHeight = $(window).height();
    const footerHeight = getFooterHeight();
    return Math.floor(windowHeight-footerHeight);
}
    
function getWindowWidth() {
    var windowWidth = $(window).width();
    return Math.floor(windowWidth);
}
function getContentWidth() {
    var windowWidth = $(window).width();
    return Math.floor(windowWidth*0.85);
}
function getFooterHeight() {
    return 50;
}

export default { 
    getFooterHeight: getFooterHeight,
    getContentHeight: getContentHeight,
    getContentWidth: getContentWidth,
    getWindowWidth: getWindowWidth,
    getWindowHeight: getWindowHeight
    
 }