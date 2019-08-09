const { path: corePath } = require('../../../test/core');

require('../../../test/exec')(
  `lila -h --core ${corePath} --root ${__dirname}/app`
);
