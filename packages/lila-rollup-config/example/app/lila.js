import tasksPlugin from '../../../lila-tasks/lib';
import rollupPlugin from '../../../lila-rollup/lib';
import rollupConfigPlugin from '../../lib';

export default lila => {
  const { setSetting } = lila;

  // setSetting('packages', 'pkgs');
  setSetting('src', 'components');
  setSetting('build', 'lib');

  tasksPlugin(lila);
  rollupPlugin(lila);
  rollupConfigPlugin(lila);

  return () => ({
    tasks: [
      // ['@lila/del', 'lib'],
      '@lila/rollup',
    ],
    banner: '/* hello */',
    filename: 'hi',
    name: 'Demo',
  });
};
