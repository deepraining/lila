const { path: corePath } = require('../../../test/core');

require('../../../test/exec')(
  `lila demo --core ${corePath} --root ${__dirname}/app`
);
