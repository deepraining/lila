
var del = require('del');
var projectConfig = require('../../project_config');

module.exports = {
    // delete dist
    delDist: () =>  {
        return del([projectConfig.buildPaths.dist.dir], {force: !0});
    },
    // delete dist tmp
    delDistTmp: () =>  {
        return del([projectConfig.buildPaths.distTmp.dir], {force: !0});
    },
    // delete dist handle html
    delDistHandleHtml: () =>  {
        return del([projectConfig.buildPaths.distHandleHtml.dir], {force: !0});
    },
    // delete dist store
    delDistStore: () =>  {
        return del([projectConfig.buildPaths.distStore.dir], {force: !0});
    }
};