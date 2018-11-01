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
  syncBuild,
  saveCache,
  syncHtml,
  syncSourceMap,
  remoteShell,
} from './sync';
import { delDev, delBuild } from './del';

export default lila => {
  const { registerTask } = lila;

  registerTask('@lila/correct-html', correctHtml);
  registerTask('@lila/replace-html', replaceHtml);
  registerTask('@lila/insert-html', insertHtml);
  registerTask('@lila/convert-html', convertHtml);
  registerTask('@lila/backup-html', backupHtml);
  registerTask('@lila/rename-html', renameHtml);

  registerTask('@lila/sync', sync);
  registerTask('@lila/sync-build', syncBuild);
  registerTask('@lila/save-cache', saveCache);
  registerTask('@lila/sync-html', syncHtml);
  registerTask('@lila/sync-sourcemap', syncSourceMap);
  registerTask('@lila/remote-shell', remoteShell);

  registerTask('@lila/del-dev', delDev);
  registerTask('@lila/del-build', delBuild);
};
