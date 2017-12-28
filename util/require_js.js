
"use strict";

var fsExtra = require('fs-extra');

var requireJsUtil = {
    /**
     * get requireJs config from file path
     *
     * @param filePath
     * @returns {*}
     */
    getConfigFromFilePath: (filePath) => {
        var content = fsExtra.readFileSync(filePath, 'utf8');

        /**
         * here can not use lambda expression, but original function expression
         */

        return Function(`
            var output, requirejs = require = function() {}, define = function() {};

            require.config = function(options) { output = options; };
            ${content}
            return output;
        `)();
    }
};

module.exports = requireJsUtil;