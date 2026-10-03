// windowdemensions.js and other modules use the global jQuery ($). Provide it
// before any module loads so their import-time calls succeed under jsdom.
const jquery = require('jquery');
global.$ = jquery;
global.jQuery = jquery;
