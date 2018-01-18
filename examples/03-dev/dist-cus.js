
require('../../util/change_cwd_to')(__dirname + '/demo');

require('./cus');

require('../../util/exec')('lila dist test-3/index');
