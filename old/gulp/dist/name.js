
const fsExtra = require('fs-extra');

const projectConfig = require('../../project_config');
const distData = require('./data');

module.exports = {
    // name html after webpack build
    nameHtml: (cb) =>  {
        fsExtra.moveSync(
            projectConfig.buildPaths.dist.dir + '/index.html',
            projectConfig.buildPaths.dist.dir + '/html/' + distData.currentConfig.module + '.html'
        );

        cb();
    }
};
