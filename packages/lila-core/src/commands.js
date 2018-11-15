const commands = [];

export default commands;

export const addCommand = initializer => {
  if (typeof initializer !== 'function')
    throw new Error('Command initializer should be a function');

  commands.push(initializer);
};

export const getCommands = () => commands;
