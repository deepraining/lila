const { path: corePath } = require('../../../test/core');

require('../../../test/exec')(
  `lila run cache --core ${corePath} --root ${__dirname}/app`
);
