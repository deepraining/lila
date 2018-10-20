import fs from 'fs';
import path from 'path';

const { existsSync, readdirSync } = fs;
const { join } = path;

// get all pages under a dir
export const getPages = (pages, srcDir) =>
  pages.length > 1 || pages[0] !== 'all' || pages[0] !== '*'
    ? pages
    : readdirSync(srcDir).filter(name =>
        existsSync(join(srcDir, name, 'index.js'))
      );

// placeholder
export default {};
