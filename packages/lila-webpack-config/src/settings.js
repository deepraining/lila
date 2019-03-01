import fs from 'fs';
import path from 'path';
import rd from 'rd';
import { correctSlash } from '../../../util/index';
import { defaultEntry } from '../../../util/constants';
import { defaultExt } from './defaults';

const { existsSync } = fs;
const { relative } = path;
const { readDirFilterSync } = rd;

// get all entries under a dir
export const makeGetEntries = lila => (dirPath, srcPath) => {
  const { getSettings } = lila;
  const [excludeEntries, extToSearch = defaultExt] = getSettings([
    'excludeEntries',
    'extToSearch',
  ]);

  const entries = [];
  readDirFilterSync(dirPath, subDirPath => {
    const htmlFile = `${subDirPath}/index.html`;
    const jsFile = `${subDirPath}/index.${extToSearch}`;

    // Both `index.html` and `index.${extToSearch}` existing, means this directory is an entry's workspace.
    if (!existsSync(htmlFile) || !existsSync(jsFile)) return;

    const entry = correctSlash(relative(srcPath, subDirPath));

    if (!excludeEntries) {
      entries.push(entry);
      return;
    }

    const excludeType = typeof excludeEntries;

    // function
    if (excludeType === 'function') {
      if (excludeEntries(entry)) return;
    }
    // string
    else if (excludeType === 'string') {
      if (entry === excludeEntries) return;
    }
    // RegExp
    else if (excludeEntries instanceof RegExp) {
      if (excludeEntries.test(entry)) return;
    }
    // array
    else if (Array.isArray(excludeEntries)) {
      for (let i = 0, il = excludeEntries.length; i < il; i += 1) {
        const excludeEntry = excludeEntries[i];

        // string
        if (typeof excludeEntry === 'string') {
          if (entry === excludeEntry) return;
        }
        // RegExp
        else if (excludeEntry instanceof RegExp) {
          if (excludeEntry.test(entry)) return;
        }
      }
    }

    entries.push(entry);
  });
  return entries;
};

// get js file path for command serve
export const servePath = (entry, srcDir) =>
  `${srcDir}/${entry === defaultEntry ? '' : `${entry}/`}serve.js`;
