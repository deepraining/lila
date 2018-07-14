const local = process.env.local || '';
let cmd = 'lila dist test/index';

if (local) {
  cmd += ` --local ${local}`;
}

const dir = process.env.fixtureDir || 'fixtures/base';

require('../../util/change_cwd')(__dirname + '/' + dir);

require('../../util/exec')(cmd);
