/**
 * Created by senntyou on 2017/11/30.
 */

var fsExtra = require('fs-extra');
fsExtra.copySync(__dirname + '/demo/bak', __dirname + '/demo/dist');

require('../../util/change_cwd_to')(__dirname + '/demo');

require('../../util/exec')('lilacs clean');
