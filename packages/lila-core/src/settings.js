import forEach from 'lodash/forEach';

import { root } from './app';
import { defaultEntry } from './constants';

const settings = {
  src: 'src',
  dev: 'dev',
  build: 'build',
  tmp: '.lila',
  root,
  defaultEntry,
};

const readOnlyNames = ['root', 'defaultEntry'];

export default settings;

/**
 * Set a setting
 * @param name
 * @param value
 */
export const setSetting = (name, value) => {
  if (readOnlyNames.indexOf(name) > -1) return;
  settings[name] = value;
};

/**
 * Set multiple settings
 * @param collection
 */
export const setSettings = collection => {
  forEach(collection, (value, key) => {
    if (readOnlyNames.indexOf(key) > -1) return;
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
