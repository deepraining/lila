import minimist from 'minimist';

/**
 * make argv
 *
 * @param options
 * @param keepUnknown
 * @returns {{}}
 */
export const makeArgv = (options, keepUnknown) => {
  const allArgv = minimist(process.argv.slice(2));
  if (!keepUnknown) delete allArgv._;

  const argv = {};
  Object.keys(options).forEach(key => {
    const value = options[key];

    if (key.slice(0, 1) !== '_' && typeof value !== 'object') argv[key] = value;
  });

  return { ...allArgv, ...argv };
};

/**
 * try obj.default, for babel transform
 *
 * @param obj
 * @returns {string|boolean|*}
 */
export const tryDefault = obj => obj.default || obj;
