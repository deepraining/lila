import forEach from 'lodash/forEach';

import { root } from './app';

const settings = {
  src: 'src',
  dev: 'dev',
  build: 'build',
  tmp: '.lila',
  root,
};

export default settings;

/**
 * Set a setting
 * @param name
 * @param value
 */
export const setSetting = (name, value) => {
  if (name === 'root') return;
  settings[name] = value;
};

/**
 * Set multiple settings
 * @param collection
 */
export const setSettings = collection => {
  forEach(collection, (value, key) => {
    if (key === 'root') return;
    settings[key] = value;
  });
};

/**
 * Get a setting
 * @param name
 * @returns {*}
 */
export const getSetting = name => settings[name];

/**
 * Get multiple settings
 * @param keys
 * @returns {[]}
 */
export const getSettings = keys => keys.map(key => settings[key]);

/**
 * Get all settings
 * @returns {{}}
 */
export const getAllSettings = () => settings;
