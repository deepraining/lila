/**
 * ```
 * lila ...
 * node -- cmd.js ...
 * ```
 */
const { path: corePath } = require('../../../test/core');

const argv = process.argv.slice(2).join(' ');

require('../../../test/exec')(
  `lila ${argv} --core ${corePath} --root ${__dirname}/app --init lila.react-vue.js`
);
