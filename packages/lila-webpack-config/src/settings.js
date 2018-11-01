import fs from 'fs';
import path from 'path';
import rd from 'rd';
import { correctSlash } from '../../../util/index';

const { existsSync } = fs;
const { relative } = path;
const { readDirFilterSync } = rd;

// get all entries under a dir
export const getEntries = dir => {
  const entries = [];
  readDirFilterSync(dir, dirPath => {
    const htmlFile = `${dirPath}/index.html`;
    const jsFile = `${dirPath}/index.js`;

    // Both `index.html` and `index.js` existing, means this directory is a entry's workspace.
    if (existsSync(htmlFile) && existsSync(jsFile)) {
      entries.push(correctSlash(relative(dir, dirPath)));
    }
  });
  return entries;
};

// get js file path for command server
export const servePath = (entry, srcDir) => `${srcDir}/${entry}/serve.js`;
