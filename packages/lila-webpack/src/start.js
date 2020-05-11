import browserSync from 'browser-sync';
import { makeMock, forceGet as forceGetMiddleware } from './util';

export default ({ entry, argv, lila }) => {
  const { getSettings, makeConfig } = lila;
  const [root, buildDir] = getSettings(['root', 'build']);

  const config = makeConfig({ entry, cmd: 'start', argv });

  const {
    forceGet = false,
    mock = true,
    mockRoot,
    port = 8090,
    browserSync: browserSyncConfig = {},
  } = config;

  if (!browserSyncConfig.server) browserSyncConfig.server = {};

  browserSyncConfig.server.baseDir = root;
  browserSyncConfig.port = port;
  browserSyncConfig.startPath = `/${buildDir}/index.html`;

  if (!browserSyncConfig.middleware) browserSyncConfig.middleware = [];

  // This must be in the first place.
  if (forceGet) browserSyncConfig.middleware.unshift(forceGetMiddleware);
  if (mock)
    browserSyncConfig.middleware.unshift(
      makeMock({ lila, entry, mockRoot, cache: !0 })
    );

  browserSync.init(browserSyncConfig);
};
