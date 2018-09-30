import dev from './dev';
import analyze from './analyze';

export default lila => {
  const { addCommand, pureArgv } = lila;

  // add dev command
  addCommand(commander => {
    commander
      .command('dev <page>')
      .description('start a local server to develop a page')
      .action((page, options) => {
        const argv = pureArgv(options);

        dev(page, argv, lila);
      });
  });

  // add analyze command
  addCommand(commander => {
    commander
      .command('analyze <page>')
      .description('visualize size of webpack output files')
      .action((page, options) => {
        const argv = pureArgv(options);

        analyze(page, argv, lila);
      });
  });
};
