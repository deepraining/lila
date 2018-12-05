import fs from 'fs';
import path from 'path';

const { readdirSync } = fs;
const { join } = path;

// get all entries with imported entries
export const makeGetEntries = packages => (entries, root, srcDir) => {
  const findAll =
    entries.length === 1 && (entries[0] === 'all' || entries[0] === '*');

  if (packages) {
    const packagesDir = typeof packages === 'string' ? packages : 'packages';
    return findAll ? readdirSync(join(root, packagesDir)) : entries;
  }

  return findAll ? readdirSync(join(root, srcDir)) : entries;
};

// placeholder
export default {};
