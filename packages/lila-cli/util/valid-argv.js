import forEach from 'lodash/forEach';

export default cmd => {
  const argv = {};

  forEach(cmd, (value, key) => {
    if (key.slice(0, 1) !== '_' && typeof value !== 'object') argv[key] = value;
  });

  return argv;
};
