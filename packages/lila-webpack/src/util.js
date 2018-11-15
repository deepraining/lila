import path from 'path';
import fs from 'fs';
import fse from 'fs-extra';
import trimEnd from 'lodash/trimEnd';

const { join } = path;
const { existsSync } = fs;
const { readFileSync } = fse;

/**
 * simulate a backend environment
 *
 * @param root
 * @param devDir
 * @param servePath
 * @returns {function(*=, *, *)}
 */
export const makeServe = ({ root, devDir, servePath }) => (req, res, next) => {
  // path/to/index/?key1=value1
  const url = trimEnd(req.url.split('?')[0], '/');

  if (url === '/serve') {
    const filePath = join(root, servePath);
    const htmlFilePath = join(root, `${devDir}/index.html`);

    if (!existsSync(filePath)) throw new Error(`file not found ${filePath}`);
    if (!existsSync(htmlFilePath))
      throw new Error(`file not found ${htmlFilePath}`);

    const content = readFileSync(htmlFilePath, 'utf8');

    // Disable cache.
    if (require.cache[filePath]) delete require.cache[filePath];

    const serve = require(filePath); // eslint-disable-line

    const newContent = serve(content, req);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(newContent);

    return;
  }

  next();
};

/**
 * ['entry1', 'entry2/*'] => ['entry1', 'entry2/subEntry1', 'entry2/subEntry2']
 *
 * @param entries
 * @param getEntries
 * @param srcPath
 * @returns {Array}
 */
export const getAllEntries = ({ entries, getEntries, srcPath }) => {
  const allEntries = [];

  entries.forEach(entry => {
    if (entry === '*' || entry === 'all')
      allEntries.push(...(getEntries(srcPath) || []));
    else if (entry.slice(-2) === '/*')
      allEntries.push(...(getEntries(join(srcPath, entry.slice(0, -2))) || []));
    else if (entry.slice(-4) === '/all')
      allEntries.push(...(getEntries(join(srcPath, entry.slice(0, -4))) || []));
    else allEntries.push(entry);
  });

  return allEntries;
};
