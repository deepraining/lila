const { path } = require('./core');

process.chdir(`${__dirname}/app`);
require('./exec')(`lila dev test --core ${path}`);
