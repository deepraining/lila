
var _ = require('lodash');

module.exports = (config) => {
    if (config.doc) {
        // ensure is an array
        config.doc.include && !Array.isArray(config.doc.include) && (config.doc.include = [config.doc.include]);
        config.doc.exclude && !Array.isArray(config.doc.exclude) && (config.doc.exclude = [config.doc.exclude]);
    }
    // has include
    if (config.doc && config.doc.include) {
        config.docSrc = [];
        config.doc.include.forEach((src) => {
            config.docSrc.push(config.buildPaths.doc_tmp.dir + '/' + src + '/**/*.js');
        })
    }
    else {
        config.docSrc = [config.buildPaths.doc_tmp.dir + '/**/*.js'];
    }
};