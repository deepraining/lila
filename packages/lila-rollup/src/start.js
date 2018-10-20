import path from 'path';
import rollup from 'rollup';
import chokidar from 'chokidar';
import browserSync from 'browser-sync';

import run from './run';
import { makeMock, forceGet as forceGetMiddleware } from './util';

const { join } = path;

export default ({ page, argv, lila }) => {
  const { getSettings, makeConfig } = lila;
  const [cwd, devDir, rollupConfigGenerator] = getSettings([
    'cwd',
    'dev',
    'rollupConfigGenerator',
  ]);

  const realDevDir = join(cwd, devDir);

  if (!rollupConfigGenerator)
    throw new Error('rollupConfigGenerator not configured');

  const makeRollupConfig = rollupConfigGenerator(rollup);

  if (typeof makeRollupConfig !== 'function')
    throw new Error('rollupConfigGenerator should return a function');

  const config = makeConfig({ page, cmd: 'start', argv });
  const rollupConfig = makeRollupConfig({
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
  } = config;

  if (!browserSyncConfig.server) browserSyncConfig.server = {};

  browserSyncConfig.server.baseDir = cwd;
  browserSyncConfig.port = port;
  browserSyncConfig.startPath = `/${devDir}/index.html`;

  if (!browserSyncConfig.middleware) browserSyncConfig.middleware = [];

  // This must be in the first place.
  if (forceGet) browserSyncConfig.middleware.unshift(forceGetMiddleware);
  if (mock) browserSyncConfig.middleware.unshift(makeMock(cwd));

  const watcher = chokidar.watch(realDevDir);
  watcher.on('change', () => {
    run(rollupConfig, rollupConfig.output).then(() => {
      browserSync.reload();
    });
  });

  run(rollupConfig, rollupConfig.output).then(() => {
    browserSync.init(browserSyncConfig);
  });
};
