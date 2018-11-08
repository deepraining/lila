const { path: corePath } = require('../../../test/core');

require('../../../test/exec')(
  `lila run -h --core ${corePath} --root ${__dirname}/app`
);
