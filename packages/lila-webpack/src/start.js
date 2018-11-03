import browserSync from 'browser-sync';
import { makeMock, forceGet as forceGetMiddleware } from '../../../util/index';

export default ({ entry, argv, lila }) => {
  const { getSettings, makeConfig } = lila;
  const [cwd, buildDir] = getSettings(['cwd', 'build']);

  const config = makeConfig({ entry, cmd: 'start', argv });

  const {
    forceGet = true,
    mock = true,
    port = 8090,
    browserSync: browserSyncConfig = {},
  } = config;

  if (!browserSyncConfig.server) browserSyncConfig.server = {};

  browserSyncConfig.server.baseDir = cwd;
  browserSyncConfig.port = port;
  browserSyncConfig.startPath = `/${buildDir}/index.html`;

  if (!browserSyncConfig.middleware) browserSyncConfig.middleware = [];

  // This must be in the first place.
  if (forceGet) browserSyncConfig.middleware.unshift(forceGetMiddleware);
  if (mock) browserSyncConfig.middleware.unshift(makeMock(cwd));

  browserSync.init(browserSyncConfig);
};
