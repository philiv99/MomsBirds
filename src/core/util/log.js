import toastr from 'toastr';
import { isNumber } from 'underscore';

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}


let logLevels = {
    SUCCESS: 0,
    INFO: 1,
    WARNING: 2,
    ERROR: 3
};
function error(msg) {
    toastr.error(msg)
}
function success(msg) {
    toastr.success(msg)
}
function warning(msg) {
    toastr.warning(msg)
}
function info(msg) {
    toastr.info(msg)
}

function log(msg, level) {
    console.log(msg);
    if (isNumber(level)) {
        switch (level) {
            case logLevels.SUCCESS: success(msg); break;
            case logLevels.INFO: info(msg); break;
            case logLevels.WARNING: warning(msg); break;
            case logLevels.ERROR: error(msg); break;
            default: info(msg);
        }
    }
}

export default {
    log: log,
    logLevels: logLevels
};