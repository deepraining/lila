
var del = require('del');
var projectConfig = require('../../project_config');

module.exports = {
    // delete dist
    delDist: () =>  {
        return del([projectConfig.buildPaths.dist.dir], {force: !0});
    },
    // delete tmp
    delTmp: () =>  {
        return del([projectConfig.buildPaths.tmp.dir], {force: !0});
    },
    // delete store
    delStore: () =>  {
        return del([projectConfig.buildPaths.store.dir], {force: !0});
    }
};