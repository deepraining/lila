const { path } = require('../core');

process.chdir(`${__dirname}/project`);
require('../exec')(`lila dev test --core ${path}`);
