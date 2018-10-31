let configGenerator;

export default (...args) => {
  if (!configGenerator)
    throw new Error('lila config generator has not been registered');

  return configGenerator(...args);
};

export const registerConfigGenerator = fn => {
  if (typeof fn !== 'function')
    throw new Error('lila config generator should be a function');

  configGenerator = fn;
};
