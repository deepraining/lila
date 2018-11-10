import rollup from 'rollup';
import chokidar from 'chokidar';
import browserSync from 'browser-sync';

import run from './run';
import { makeMock, forceGet as forceGetMiddleware } from '../../../util/index';

export default ({ entry, argv, lila }) => {
  const { getSettings, makeConfig } = lila;
  const [root, devDir, rollupConfigGenerator] = getSettings([
    'root',
    'dev',
    'rollupConfigGenerator',
  ]);

  if (!rollupConfigGenerator)
    throw new Error('rollupConfigGenerator not configured');

  const makeRollupConfig = rollupConfigGenerator(rollup);

  if (typeof makeRollupConfig !== 'function')
    throw new Error('rollupConfigGenerator should return a function');

  const config = makeConfig({ entry, cmd: 'start', argv });
  const rollupConfig = makeRollupConfig({
    entry,
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
    watch = 'src',
  } = config;

  if (!browserSyncConfig.server) browserSyncConfig.server = {};

  browserSyncConfig.server.baseDir = root;
  browserSyncConfig.port = port;
  browserSyncConfig.startPath = `/${devDir}/index.html`;

  if (!browserSyncConfig.middleware) browserSyncConfig.middleware = [];

  // This must be in the first place.
  if (forceGet) browserSyncConfig.middleware.unshift(forceGetMiddleware);
  if (mock) browserSyncConfig.middleware.unshift(makeMock(root));

  let globs = watch;
  let options;

  if (Array.isArray(watch) && typeof watch[1] === 'object') {
    [globs, options] = watch;
  }

  globs = (Array.isArray(globs) ? globs : [globs]).map(g => `${root}/${g}`);

  const watcher = chokidar.watch(globs, options);
  watcher.on('change', () => {
    run(rollupConfig, rollupConfig.output).then(() => {
      browserSync.reload();
    });
  });

  run(rollupConfig, rollupConfig.output).then(() => {
    browserSync.init(browserSyncConfig);
  });
};
