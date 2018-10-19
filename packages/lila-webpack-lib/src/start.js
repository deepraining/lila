import path from 'path';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import browserSync from 'browser-sync';

import { makeMock, forceGet as forceGetMiddleware } from './util';
import { defaultDevMiddleware } from './defaults';

const { join } = path;

export default ({ page, argv, lila }) => {
  const { getSettings, makeConfig } = lila;
  const [cwd, devDir, appDir, webpackConfigGenerator] = getSettings([
    'cwd',
    'dev',
    'app',
    'webpackConfigGenerator',
  ]);

  const realAppDir = join(cwd, appDir);

  if (!webpackConfigGenerator)
    throw new Error('webpackConfigGenerator not configured');

  const makeWebpackConfig = webpackConfigGenerator(webpack);

  if (typeof makeWebpackConfig !== 'function')
    throw new Error('webpackConfigGenerator should return a function');

  const config = makeConfig({ page, cmd: 'start', argv });
  const webpackConfig = makeWebpackConfig({
    page,
    argv,
    cmd: 'start',
    config,
    lila,
  });

  const {
    forceGet = true,
    mock = true,
    port = 8090,
    browserSync: browserSyncConfig = {},
    devMiddleware: devMiddlewareConfig = defaultDevMiddleware,
    hotMiddleware: hotMiddlewareConfig = {},
  } = config;

  const compiler = webpack(webpackConfig);

  if (!browserSyncConfig.server) browserSyncConfig.server = {};

  browserSyncConfig.server.baseDir = realAppDir;
  browserSyncConfig.port = port;
  browserSyncConfig.startPath = `/${devDir}/index.html`;

  if (!browserSyncConfig.middleware) browserSyncConfig.middleware = [];

  // This must be in the first place.
  if (forceGet) browserSyncConfig.middleware.unshift(forceGetMiddleware);
  if (mock) browserSyncConfig.middleware.unshift(makeMock(realAppDir));

  devMiddlewareConfig.stats = 'errors-only';
  devMiddlewareConfig.publicPath = `/${devDir}/`;

  browserSyncConfig.middleware.push(
    devMiddleware(compiler, devMiddlewareConfig)
  );
  browserSyncConfig.middleware.push(
    hotMiddleware(compiler, hotMiddlewareConfig)
  );

  browserSync.init(browserSyncConfig);
};
