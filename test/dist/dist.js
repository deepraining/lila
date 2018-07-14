const local = process.env.local || '';
let cmd = 'lila dist test/index';

if (local) {
  cmd += ` --local ${local}`;
}

require('../../util/change_cwd')(__dirname + '/demo');

require('../../util/exec')(cmd);
