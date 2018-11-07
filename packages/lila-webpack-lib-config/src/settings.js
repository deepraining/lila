import fs from 'fs';

const { readdirSync } = fs;

// get all entries with imported entries
export const getEntries = (entries, srcPath) =>
  entries.length === 1 && (entries[0] === 'all' || entries[0] === '*')
    ? readdirSync(srcPath)
    : entries;

// placeholder
export default {};
