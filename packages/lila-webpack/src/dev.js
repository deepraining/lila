import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import browserSync from 'browser-sync';

import makeMock from './make-mock';
import forceGetMiddleware from './force-get';

export default (page, argv, lila) => {
  const { getSetting, makeConfig } = lila;
  const devRoot = getSetting('devRoot');
  const webRoot = getSetting('webRoot');
  const config = makeConfig({ page, cmd: 'dev' }, argv);

  const { forceGet = true, mock = true, port = 8090 } = config;
  const webpackConfig = config.webpack || {};
  const browserSyncConfig = config.browserSync || {};
  const webpackDevConfig = config.webpackDev || {};
  const webpackHotConfig = config.webpackHot || {};

  const compiler = webpack(webpackConfig);

  browserSyncConfig.server = { baseDir: webRoot };
  browserSyncConfig.port = port;
  browserSyncConfig.startPath = '/dev/index.html';

  if (!browserSyncConfig.middleware) browserSyncConfig.middleware = [];

  // This must be in the first place.
  if (forceGet) browserSyncConfig.middleware.unshift(forceGetMiddleware);
  if (mock) browserSyncConfig.middleware.unshift(makeMock(webRoot));

  const devOptions = webpackDevConfig;
  devOptions.stats = 'errors-only';
  devOptions.publicPath = devRoot;

  browserSyncConfig.middleware.push(devMiddleware(compiler, devOptions));
  browserSyncConfig.middleware.push(hotMiddleware(compiler, webpackHotConfig));

  browserSync.init(browserSyncConfig);
};
