export default cmd => {
  const argv = {};

  Object.keys(cmd).forEach(key => {
    const value = cmd[key];

    if (key.slice(0, 1) !== '_' && typeof value !== 'object') argv[key] = value;
  });

  return argv;
};
