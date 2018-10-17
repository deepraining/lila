const options = [];

export default options;

export const addBuildCmdOption = (...args) => {
  if (!args || !args.length)
    throw new Error('Expect at least one argument when add a build cmd option');

  options.push(args);
};

export const getBuildCmdOptions = () => options;
