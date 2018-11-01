import fs from 'fs';

const { readdirSync } = fs;

// get all entries with imported entries
export const getEntries = (entries, srcDir) =>
  entries.length === 1 && (entries[0] === 'all' || entries[0] === '*')
    ? readdirSync(srcDir)
    : entries;

// placeholder
export default {};
