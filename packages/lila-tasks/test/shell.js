const { path: corePath } = require('../../../test/core');

require('../../../test/exec')(
  `lila run shell --core ${corePath} --root ${__dirname}/app`
);
