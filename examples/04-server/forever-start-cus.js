/**
 * Created by senntyou on 2017/11/30.
 */

require('../../util/change_cwd_to')(__dirname + '/demo');

require('./cus');

require('../../util/exec')('lilacs forever start');
