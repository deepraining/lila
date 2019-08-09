import { make, replace, insert, convert, backup } from './file';
import { move, copy, delTask, delDev, delBuild, delTmp } from './dir';
import {
  sync,
  syncSaveCache,
  syncDir,
  syncBuild,
  syncHtml,
  syncSourceMap,
  remoteShell,
} from './sync';
import { shell, cleanCache, saveCache } from './misc';

export default lila => {
  const { registerTask } = lila;

  registerTask('@lila/make', make);
  registerTask('@lila/replace', replace);
  registerTask('@lila/insert', insert);
  registerTask('@lila/convert', convert);
  registerTask('@lila/backup', backup);

  registerTask('@lila/move', move);
  registerTask('@lila/copy', copy);
  registerTask('@lila/del', delTask);
  registerTask('@lila/del-dev', delDev);
  registerTask('@lila/del-build', delBuild);
  registerTask('@lila/del-tmp', delTmp);

  registerTask('@lila/sync', sync);
  registerTask('@lila/sync-save-cache', syncSaveCache);
  registerTask('@lila/sync-dir', syncDir);
  registerTask('@lila/sync-build', syncBuild);
  registerTask('@lila/sync-html', syncHtml);
  registerTask('@lila/sync-source-map', syncSourceMap);
  registerTask('@lila/remote-shell', remoteShell);

  registerTask('@lila/shell', shell);
  registerTask('@lila/clean-cache', cleanCache);
  registerTask('@lila/save-cache', saveCache);
};
