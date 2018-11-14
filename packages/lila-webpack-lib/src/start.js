import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import browserSync from 'browser-sync';

import { makeMock, forceGet as forceGetMiddleware } from '../../../util/index';
import { defaultDevMiddleware } from './defaults';

export default ({ entry, argv, lila }) => {
  const { getSettings, makeConfig } = lila;
  const [root, devDir, webpackConfigGenerator] = getSettings([
    'root',
    'dev',
    'webpackConfigGenerator',
  ]);

  if (!webpackConfigGenerator)
    throw new Error('webpackConfigGenerator not configured');

  const makeWebpackConfig = webpackConfigGenerator(webpack);

  if (typeof makeWebpackConfig !== 'function')
    throw new Error('webpackConfigGenerator should return a function');

  const config = makeConfig({ entry, cmd: 'start', argv });
  const webpackConfig = makeWebpackConfig({
    entry,
    argv,
    cmd: 'start',
    config,
    lila,
  });

  const {
    forceGet = true,
    mock = true,
    mockRoot = `/${entry}`,
    port = 8090,
    browserSync: browserSyncConfig = {},
    devMiddleware: devMiddlewareConfig = defaultDevMiddleware,
    hotMiddleware: hotMiddlewareConfig = {},
  } = config;

  const compiler = webpack(webpackConfig);

  if (!browserSyncConfig.server) browserSyncConfig.server = {};

  browserSyncConfig.server.baseDir = root;
  browserSyncConfig.port = port;
  browserSyncConfig.startPath = `/${devDir}/index.html`;

  if (!browserSyncConfig.middleware) browserSyncConfig.middleware = [];

  // This must be in the first place.
  if (forceGet) browserSyncConfig.middleware.unshift(forceGetMiddleware);
  if (mock) browserSyncConfig.middleware.unshift(makeMock(root, mockRoot));

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
