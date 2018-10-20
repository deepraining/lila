import fs from 'fs';

const { readdirSync } = fs;

// get all pages with imported pages
export const getPages = (pages, srcDir) =>
  pages.length === 1 && (pages[0] === 'all' || pages[0] === '*')
    ? readdirSync(srcDir)
    : pages;

// placeholder
export default {};
