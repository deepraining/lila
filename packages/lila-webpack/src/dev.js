import path from 'path';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import browserSync from 'browser-sync';

import { makeMock, forceGet as forceGetMiddleware, makeServe } from './util';

const { join } = path;

export default ({ page, argv, lila, serve, servePath }) => {
  const { getSettings, makeConfig } = lila;
  const [cwd, srcDir, devDir, appDir, webpackConfigGenerator] = getSettings([
    'cwd',
    'srcDir',
    'devDir',
    'appDir',
    'webpackConfigGenerator',
  ]);

  const realAppDir = join(cwd, appDir);

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
    browserSync: browserSyncConfig = {},
    webpackDev: webpackDevConfig = {},
    webpackHot: webpackHotConfig = {},
  } = config;

  const compiler = webpack(webpackConfig);

  if (!browserSyncConfig.server) browserSyncConfig.server = {};

  browserSyncConfig.server.baseDir = realAppDir;
  browserSyncConfig.port = port;
  browserSyncConfig.startPath = serve ? '/serve' : `/${devDir}/index.html`;

  if (!browserSyncConfig.middleware) browserSyncConfig.middleware = [];

  // This must be in the first place.
  if (forceGet) browserSyncConfig.middleware.unshift(forceGetMiddleware);
  if (mock) browserSyncConfig.middleware.unshift(makeMock(realAppDir));
  if (serve)
    browserSyncConfig.middleware.unshift(
      makeServe({
        root: realAppDir,
        devDir,
        servePath: servePath(page, srcDir),
      })
    );

  webpackDevConfig.stats = 'errors-only';
  webpackDevConfig.publicPath = `/${devDir}/`;

  browserSyncConfig.middleware.push(devMiddleware(compiler, webpackDevConfig));
  browserSyncConfig.middleware.push(hotMiddleware(compiler, webpackHotConfig));

  browserSync.init(browserSyncConfig);
};
