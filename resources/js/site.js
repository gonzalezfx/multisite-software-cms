// NPM based vendors
window.$ = window.jQuery = require('jquery');
window.nouislider = require('nouislider');
window.alertify = require('alertifyjs');
require('select2');
require('leaflet');
require('@fancyapps/fancybox');

// File based vendors
require('./site/vendor/royalslider.min');
require('./site/vendor/slick.min');

// Custom imports
window.helpers = require('./site/helpers/helperFunctions');
require('./site/components/generic');
require('./site/components/layout');
require('./site/components/home');

/*
 *  Default Jquery AJAX Setup
 */
$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
  },
});

window.BASE_URL = $('meta[name="base-url"]').attr('content');
