export default lila => {
  const { registerTask, addCmdOption, addCommand } = lila;

  // lila.log('default log');
  // lila.log('green', 'green log');
  // lila.log(false, 'plain log');
  // lila.info('default info');
  // lila.info('blue', 'blue info');
  // lila.info(false, 'plain info');
  // lila.warn('default warn');
  // lila.warn('yellow', 'yellow warn');
  // lila.warn(false, 'plain warn');
  // lila.error('default error');
  // lila.error('red', 'red error');
  // lila.error(false, 'plain error');

  lila.setSetting('beforeTasks', args => {
    lila.info('\n  tasks are about to start\n');
    lila.log(`args: ${Object.keys(args).join(',')}\n`);
  });

  lila.setSetting('afterTasks', args => {
    lila.success('\n  tasks finished\n');
    lila.log(`args: ${Object.keys(args).join(',')}\n`);
  });

  lila.setSetting('errorTasks', args => {
    lila.error('\n  error occurred\n');
    lila.log(`args: ${Object.keys(args).join(',')}\n`);
  });

  registerTask('log', ({ entry, args }) => cb => {
    console.log(`entry: ${entry}`);
    args.forEach(arg => {
      console.log(arg);
    });

    // console.log(hello.hi); // eslint-disable-line

    cb();
  });

  addCmdOption('run', '-a --aa [aa]', 'aa description', 'aa');
  addCmdOption('run', '-b --bb [bb]', 'bb description', 'bb');

  addCommand(commander => {
    commander
      .command('demo')
      .description('demo cmd')
      .action(() => {
        console.log('demo');
      });
  });

  return ({ entry, argv, cmd }) => ({
    tasks: ['log', ['log', entry, argv, cmd]],
  });
};
