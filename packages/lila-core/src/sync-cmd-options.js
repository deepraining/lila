const options = [];

export default options;

export const addSyncCmdOption = (...args) => {
  if (!args || !args.length)
    throw new Error('Expect at least one argument when add a sync cmd option.');

  options.push(args);
};

export const getSyncCmdOptions = () => options;
