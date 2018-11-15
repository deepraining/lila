const { path: corePath } = require('../../../test/core');

require('../../../test/exec')(
  `lila run test test2 --core ${corePath} --root ${__dirname}/app`
);
