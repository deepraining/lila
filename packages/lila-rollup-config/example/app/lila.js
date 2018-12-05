import tasksPlugin from '../../../lila-tasks/lib';
import rollupPlugin from '../../../lila-rollup/lib';
import rollupConfigPlugin from '../../lib';

export default lila => {
  const { setSetting } = lila;

  // setSetting('packages', 'pkgs');
  // setSetting('src', 'components');
  setSetting('build', 'lib');

  tasksPlugin(lila);
  rollupPlugin(lila);
  rollupConfigPlugin(lila);

  return ({ cmd }) => ({
    tasks: [
      // ['@lila/del', 'lib'],
      '@lila/rollup',
    ],
    flow: !0,
    flowRuntime: cmd === 'start',
    // minCss: !1,
    // minJs: !1,
    // banner: '/* hello */',
    // filename: 'hi',
    // name: 'Demo',
    external: ['react', 'react-dom'],
    globals: { react: 'react', 'react-dom': 'react-dom' },
    watch: ['src', 'demo'],
  });
};
