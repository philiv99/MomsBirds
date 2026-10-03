import log from './log.js'

function initGlobalHandlers() {
    window.addEventListener('unhandledrejection', function(event) {
        //alert(event.promise); 
        log(event.reason); 
    });
}

export default initGlobalHandlers;