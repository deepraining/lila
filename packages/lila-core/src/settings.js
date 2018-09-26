const settings = {
  srcRoot: 'src',
  buildRoot: 'build',
  webRoot: 'src',
};

export default settings;

/**
 * Set a setting value
 * @param name Setting name
 * @param value Setting value
 */
export const setSetting = (name, value) => {
  settings[name] = value;
};

/**
 * Set multiple settings
 * @param collection
 */
export const setSettings = collection => {
  Object.keys(collection).forEach(key => {
    settings[key] = collection[key];
  });
};

/**
 * Get a setting value
 * @param name
 * @returns {*}
 */
export const getSetting = name => settings[name];

/**
 * Get all settings
 * @returns {{}}
 */
export const getSettings = () => settings;
