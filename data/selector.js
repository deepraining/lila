
'use strict';

var selector = {
    // valid js selector when merge js
    validJs: 'script:not([type])[src]:not([data-lilacs-no-concat]),script[type="text/javascript"][src]:not([data-lilacs-no-concat])',
    // valid link selector when merge css
    validCss: 'link[rel="stylesheet"]:not([type])[href]:not([data-lilacs-no-concat]),link[rel="stylesheet"][type="text/css"][href]:not([data-lilacs-no-concat])'
};

module.exports = selector;