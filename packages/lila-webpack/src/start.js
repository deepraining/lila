import browserSync from 'browser-sync';
import { makeMock, forceGet as forceGetMiddleware } from '../../../util/index';
import { defaultEntry } from '../../../util/constants';

export default ({ entry, argv, lila }) => {
  const { getSettings, makeConfig } = lila;
  const [root, buildDir] = getSettings(['root', 'build']);

  const config = makeConfig({ entry, cmd: 'start', argv });

  const {
    forceGet = true,
    mock = true,
    mockRoot = `/src${entry === defaultEntry ? '' : `/${entry}`}`,
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
  if (mock) browserSyncConfig.middleware.unshift(makeMock(root, mockRoot));

  browserSync.init(browserSyncConfig);
};
