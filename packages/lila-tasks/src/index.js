import {
  correctHtml,
  replaceHtml,
  insertHtml,
  convertHtml,
  backupHtml,
  renameHtml,
} from './html';
import {
  sync,
  syncDir,
  syncBuild,
  syncHtml,
  syncSourceMap,
  remoteShell,
} from './sync';
import { delDev, delBuild, delDir, copyDir, moveDir } from './dir';
import { shell, cleanCache, saveCache } from './misc';

export default lila => {
  const { registerTask } = lila;

  registerTask('@lila/correct-html', correctHtml);
  registerTask('@lila/replace-html', replaceHtml);
  registerTask('@lila/insert-html', insertHtml);
  registerTask('@lila/convert-html', convertHtml);
  registerTask('@lila/backup-html', backupHtml);
  registerTask('@lila/rename-html', renameHtml);

  registerTask('@lila/sync', sync);
  registerTask('@lila/sync-dir', syncDir);
  registerTask('@lila/sync-build', syncBuild);
  registerTask('@lila/sync-html', syncHtml);
  registerTask('@lila/sync-sourcemap', syncSourceMap);
  registerTask('@lila/remote-shell', remoteShell);

  registerTask('@lila/del-dev', delDev);
  registerTask('@lila/del-build', delBuild);
  registerTask('@lila/del-dir', delDir);
  registerTask('@lila/copy-dir', copyDir);
  registerTask('@lila/move-dir', moveDir);

  registerTask('@lila/shell', shell);
  registerTask('@lila/clean-cache', cleanCache);
  registerTask('@lila/save-cache', saveCache);
};
