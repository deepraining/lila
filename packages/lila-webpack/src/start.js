import path from 'path';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import browserSync from 'browser-sync';

import makeMock from './make-mock';
import forceGetMiddleware from './force-get';

const { join } = path;

export default (page, argv, lila) => {
  const { getSettings, makeConfig } = lila;
  const [cwd, devDir, appDir, webpackConfigGenerator] = getSettings([
    'cwd',
    'devDir',
    'appDir',
    'webpackConfigGenerator',
  ]);

  const realAppDir = join(cwd, appDir);
  const realDevDir = join(realAppDir, devDir);

  if (!webpackConfigGenerator)
    throw new Error('webpackConfigGenerator not configured');

  const makeWebpackConfig = webpackConfigGenerator(webpack);

  if (typeof makeWebpackConfig !== 'function')
    throw new Error('webpackConfigGenerator should return a function');

  const config = makeConfig({ page, cmd: 'dev', argv });
  const webpackConfig = makeWebpackConfig({
    page,
    argv,
    cmd: 'dev',
    config,
    lila,
  });

  const {
    forceGet = true,
    mock = true,
    port = 8090,
    startPath = `/${devDir}/index.html`,
  } = config;
  const browserSyncConfig = config.browserSync || {};
  const webpackDevConfig = config.webpackDev || {};
  const webpackHotConfig = config.webpackHot || {};

  const compiler = webpack(webpackConfig);

  browserSyncConfig.server = { baseDir: realDevDir };
  browserSyncConfig.port = port;
  browserSyncConfig.startPath = startPath;

  if (!browserSyncConfig.middleware) browserSyncConfig.middleware = [];

  // This must be in the first place.
  if (forceGet) browserSyncConfig.middleware.unshift(forceGetMiddleware);
  if (mock) browserSyncConfig.middleware.unshift(makeMock(realAppDir));

  webpackDevConfig.stats = 'errors-only';
  webpackDevConfig.publicPath = `/${devDir}/`;

  browserSyncConfig.middleware.push(devMiddleware(compiler, webpackDevConfig));
  browserSyncConfig.middleware.push(hotMiddleware(compiler, webpackHotConfig));

  browserSync.init(browserSyncConfig);
};
