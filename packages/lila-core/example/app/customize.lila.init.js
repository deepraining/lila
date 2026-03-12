export default lila => {
  const { registerTask, addCommand } = lila;

  registerTask('log', ({ entry, args }) => cb => {
    console.log(`entry: ${entry}`);
    args.forEach(arg => {
      console.log(arg);
    });

    // console.log(hello.hi); // eslint-disable-line

    cb();
  });

  addCommand(commander => {
    commander
      .command('customize')
      .description('customize cmd')
      .action(() => {
        console.log('customize');
      });
  });

  return ({ entry, argv, cmd }) => ({
    tasks: ['log', ['log', entry, argv, cmd]],
  });
};
