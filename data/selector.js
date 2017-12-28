
'use strict';

var selector = {
    // valid js selector when merge js
    validJs: 'script:not([type])[src]:not([data-lila-no-concat]),script[type="text/javascript"][src]:not([data-lila-no-concat])',
    // valid link selector when merge css
    validCss: 'link[rel="stylesheet"]:not([type])[href]:not([data-lila-no-concat]),link[rel="stylesheet"][type="text/css"][href]:not([data-lila-no-concat])'
};

module.exports = selector;