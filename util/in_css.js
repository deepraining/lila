
"use strict";

var fsExtra = require('fs-extra');

var inCssUtil = {
    /**
     * get InCss modules from InCss.use();
     *
     * example: 'InCss.use("bootstrap", "test/index")' -> ['bootstrap', 'test/index']
     *
     * @param content
     * @returns {Array}
     */
    getModulesFromUseContent: (content) => {

        /**
         * here can not use lambda expression, but original function expression
         */

        return Function(`
            var output, InCss = {};

            InCss.use = function() {
                output = Array.prototype.slice.call(arguments);
            };
            ${content};
            return output;
        `)();
    },
    /**
     * get InCss config from file path
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
        var output, InCss = {};

        InCss.config = function(options) {
            output = options;
        };
        ${content};
        return output;
        `)()
    }
};

module.exports = inCssUtil;