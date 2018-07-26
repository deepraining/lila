const fse = require('fs-extra');

fse.copySync(__dirname + '/demo/bak', __dirname + '/demo/dist');

require('../../util/change_cwd')(__dirname + '/demo');

require('../../util/exec')('lila clean');
