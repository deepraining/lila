
var del = require('del');
var projectConfig = require('../../project_config');

module.exports = {
    // delete copied dev
    delCopiedDev: () =>  {
        return del([projectConfig.buildPaths.copiedDev.dir], {force: !0});
    },
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
    },
    // delete extract
    delExtract: () =>  {
        return del([projectConfig.buildPaths.extract.dir], {force: !0});
    },
    // delete build resources
    delBuildResources: () =>  {
        return del([projectConfig.buildPaths.resources.buildDir], {force: !0});
    }
};