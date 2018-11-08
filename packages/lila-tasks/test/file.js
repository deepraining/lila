const { path: corePath } = require('../../../test/core');

require('../../../test/exec')(
  `lila run file --core ${corePath} --root ${__dirname}/app`
);
