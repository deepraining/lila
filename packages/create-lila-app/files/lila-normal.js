/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies */
import tasksPlugin from 'lila-tasks';
import webpackPlugin from 'lila-webpack';
import webpackConfigPlugin from 'lila-webpack-config';

export default lila => {
  tasksPlugin(lila);
  webpackPlugin(lila);
  webpackConfigPlugin(lila);

  return ({ entry }) => ({
    tasks: [
      '@lila/webpack',
      [
        '@lila/move',
        { source: 'build/index.html', target: `build/${entry}.html` },
      ],
    ],
  });
};
