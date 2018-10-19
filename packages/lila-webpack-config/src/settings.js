import fs from 'fs';
import path from 'path';
import rd from 'rd';
import { correctSlash } from '../../../util/index';

const { existsSync } = fs;
const { relative } = path;
const { readDirFilterSync } = rd;

// get all pages under a dir
export const getPages = dir => {
  const pages = [];
  readDirFilterSync(dir, dirPath => {
    const htmlFile = `${dirPath}/index.html`;
    const jsFile = `${dirPath}/index.js`;

    // Both `index.html` and `index.js` existing, means this directory is a page's workspace.
    if (existsSync(htmlFile) && existsSync(jsFile)) {
      pages.push(correctSlash(relative(dir, dirPath)));
    }
  });
  return pages;
};

// get js file path for command server
export const servePath = (page, srcDir) => `${srcDir}/${page}/serve.js`;
