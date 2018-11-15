module.exports = lila => {
  const { registerTask, addCmdOption, addCommand } = lila;

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
