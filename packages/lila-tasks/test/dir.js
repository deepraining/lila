const { path: corePath } = require('../../../test/core');

require('../../../test/exec')(
  `lila run dir --core ${corePath} --root ${__dirname}/app`
);
