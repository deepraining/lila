import forEach from 'lodash/forEach';

const settings = {
  srcRoot: 'src', // src root directory (relative to project root)
  buildRoot: 'dist', // build root directory (relative to project root)
  webRoot: './', // web root directory (relative to project root)
  getEntryJs: undefined, // Get entry js file path of a page.
  getEntryHtml: undefined, // Get entry html file path of a page.
};

/**
 * Get entry js file path of a page.
 *
 * @param page
 * @returns {string}
 */
const defaultGetEntryJs = page => `${settings.srcRoot}/${page}/index.js`;

/**
 * Get entry html file path of a page.
 *
 * @param page
 * @returns {string}
 */
const defaultGetEntryHtml = page => `${settings.srcRoot}/${page}/index.html`;

settings.getEntryJs = defaultGetEntryJs;
settings.getEntryHtml = defaultGetEntryHtml;

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
  forEach(collection, (value, key) => {
    settings[key] = value;
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
