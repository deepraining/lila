const options = {};

export default options;

export const addCmdOption = (cmd, ...option) => {
  if (!options[cmd]) options[cmd] = [];

  options[cmd].push(option);
};

export const getCmdOptions = cmd => options[cmd] || [];
