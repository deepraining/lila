
require('../../util/change_cwd')(__dirname + '/demo');

require('../../util/exec')('lila dist test/*,test-2/*');
