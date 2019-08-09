module.exports = lila => {
  const { registerTask, addCmdOption, addCommand } = lila;

  registerTask('log', taskOptions => cb => {
    const configOptions = (taskOptions.args && taskOptions.args[0]) || {};

    console.log('');
    Object.keys(configOptions).forEach(key => {
      console.log(`configOptions.${key}: ${typeof configOptions[key]}`);
      console.log(`configOptions.${key}: ${configOptions[key]}`);
    });

    console.log('');
    Object.keys(taskOptions).forEach(key => {
      console.log(`taskOptions.${key}: ${typeof taskOptions[key]}`);
      console.log(`taskOptions.${key}: ${taskOptions[key]}`);
    });
    console.log('');

    cb();
  });

  registerTask('demo', () => cb => {
    console.log(hello.hi); // eslint-disable-line

    cb();
  });

  addCmdOption('run', '-a --aa [aa]', 'aa description', 'aa');
  addCmdOption('run', '-b --bb [bb]', 'bb description', 'bb');

  addCommand(commander => {
    commander
      .command('demo')
      .description('demo cmd')
      .action(() => {
        lila.runTasks({ entries: ['demo'], argv: {}, cmd: 'demo' });
      });
  });

  return configOptions => ({
    tasks:
      configOptions.entry === 'demo'
        ? ['demo']
        : ['log', ['log', configOptions]],
  });
};
