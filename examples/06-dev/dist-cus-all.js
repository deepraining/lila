
require('../../util/change_cwd')(__dirname + '/demo');

require('./cus');

require('../../util/exec')('lila dist *');
