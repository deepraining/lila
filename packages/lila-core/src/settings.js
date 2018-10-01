import fs from 'fs';
import path from 'path';
import rd from 'rd';
import forEach from 'lodash/forEach';

import { correctSlash } from '../../../util/index';

const { existsSync } = fs;
const { relative } = path;
const { readDirFilterSync } = rd;

const settings = {
  srcDir: 'src',
  devDir: 'dev',
  buildDir: 'build',
  /**
   * app dir
   *
   * @example
   *
   * ```
   * app/(src,dev,build)
   * ```
   */
  appDir: '',
  // message for all tasks been done
  doneMessage: `
  done
  `,
  // get all pages under a dir
  getPages: dir => {
    const pages = [];
    readDirFilterSync(dir, dirPath => {
      const htmlFile = `${dirPath}/index.html`;
      const jsFile = `${dirPath}/index.js`;

      // Both `index.html` and `index.js` existing, means this directory is a page's workspace.
      if (existsSync(htmlFile) && existsSync(jsFile)) {
        pages.push(correctSlash(relative(dir, dirPath)));
      }
    });
  },
};

export default settings;

/**
 * Set a setting
 * @param name
 * @param value
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
