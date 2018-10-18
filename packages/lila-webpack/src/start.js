import path from 'path';
import browserSync from 'browser-sync';

const { join } = path;

export default ({ page, argv, lila }) => {
  const { getSettings, makeConfig } = lila;
  const [cwd, buildDir, appDir] = getSettings(['cwd', 'buildDir', 'appDir']);

  const realAppDir = join(cwd, appDir);

  const config = makeConfig({ page, cmd: 'start', argv });

  const { port = 8190, browserSync: browserSyncConfig = {} } = config;

  if (!browserSyncConfig.server) browserSyncConfig.server = {};

  browserSyncConfig.server.baseDir = realAppDir;
  browserSyncConfig.port = port;
  browserSyncConfig.startPath = `/${buildDir}/index.html`;

  browserSync.init(browserSyncConfig);
};
