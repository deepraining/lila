const { path: corePath } = require('../../../test/core');

require('../../../test/exec')(
  `lila run del --core ${corePath} --root ${__dirname}/app`
);
