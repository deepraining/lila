
var cheerio = require('cheerio');
var fsExtra = require('fs-extra');
var distData = require('./data');

var adjustHtmlForConcatJs = require('../handle/adjust_html_for_concat_js');
var adjustHtmlForConcatCss = require('../handle/adjust_html_for_concat_css');
var getUpdatedRequireJsConfig = require('../handle/get_updated_require_js_config');
var getUpdatedInCssConfig = require('../handle/get_updated_in_css_config');
var inCssToTagLoad = require('../handle/in_css_to_tag_load');
var requireJsToTagLoad = require('../handle/require_js_to_tag_load');

module.exports = {
    /**
     * format html for merging js
     *
     * @param cb
     */
    adjustHtmlForConcatJs: (cb) =>  {
        if (distData.currentConfig.needConcatJs) {
            adjustHtmlForConcatJs(distData.currentConfig);
        }
        cb();
    },
    /**
     * format html for merging css
     *
     * @param cb
     */
    adjustHtmlForConcatCss: (cb) =>  {
        if (distData.currentConfig.needConcatCss) {
            adjustHtmlForConcatCss(distData.currentConfig);
        }
        cb();
    },
    /**
     * import require_js_config.js content into html
     *
     * example:
     *     originHtml: <script src="path/to/require-js/config.js"></script>
     *     importedHtml: <script>require.config({...})</script>
     *
     * @param cb
     */
    adjustHtmlForRequireJs: (cb) =>  {
        if (distData.currentConfig.useRequireJs && distData.currentConfig.revisionFiles &&
            (!distData.currentConfig.requireJsToTagLoad || distData.currentConfig.hasExtraJsEntryModules)) {

            // html file path
            var htmlPath = distData.currentConfig.buildPaths.extract.html + '/' + distData.currentConfig.moduleHtml;
            // make $
            var $ = cheerio.load(fsExtra.readFileSync(htmlPath, 'utf8'), {decodeEntities: !1});

            $(distData.currentConfig.requireJsConfigTagSelector)
                .removeAttr('src')
                .text('require.config(' + JSON.stringify(getUpdatedRequireJsConfig(distData.currentConfig)) + ');');

            fsExtra.outputFileSync(htmlPath, $.html());
        }
        cb();
    },
    /**
     * import in_css_config.js content into html
     *
     * example:
     *     originHtml: <script src="path/to/in-css/config.js"></script>
     *     importedHtml: <script>InCss.config({...})</script>
     *
     * @param cb
     */
    adjustHtmlForInCss: (cb) =>  {
        if (distData.currentConfig.useInCss && distData.currentConfig.revisionFiles &&
            !distData.currentConfig.inCssToTagLoad) {

            // html file path
            var htmlPath = distData.currentConfig.buildPaths.extract.html + '/' + distData.currentConfig.moduleHtml;
            // make $
            var $ = cheerio.load(fsExtra.readFileSync(htmlPath, 'utf8'), {decodeEntities: !1});

            $(distData.currentConfig.inCssConfigTagSelector)
                .removeAttr('src')
                .text('InCss.config(' + JSON.stringify(getUpdatedInCssConfig(distData.currentConfig)) + ');');

            fsExtra.outputFileSync(htmlPath, $.html());
        }
        cb();
    },
    /**
     * make js async load to sync tag load
     *
     * example:
     *     originHtml:
     *         ```
     *         <script>
     *             require(['module1', 'module2']);
     *         </script>
     *         ```
     *     handledHtml:
     *         ```
     *         <script src="path/to/module1"></script>
     *         <script src="path/to/module2"></script>
     *         ```
     *
     * @param cb
     */
    adjustHtmlForRequireJsToTagLoad: (cb) =>  {
        if (distData.currentConfig.useRequireJs && distData.currentConfig.requireJsToTagLoad) {
            requireJsToTagLoad(distData.currentConfig);
        }
        cb();
    },
    /**
     * make css async load to sync tag load
     *
     * example:
     *     originHtml:
     *         ```
     *         <script>
     *             InCss.use('module1', 'module2');
     *         </script>
     *         ```
     *     handledHtml:
     *         ```
     *         <link rel="stylesheet" href="path/to/module1">
     *         <link rel="stylesheet" href="path/to/module2">
     *         ```
     *
     * @param cb
     */
    adjustHtmlForInCssToTagLoad: (cb) =>  {
        if (distData.currentConfig.useInCss && distData.currentConfig.inCssToTagLoad) {
            inCssToTagLoad(distData.currentConfig);
        }
        cb();
    }
};