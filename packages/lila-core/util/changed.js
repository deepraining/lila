import fs from 'fs';
import path from 'path';
import md5 from 'crypto-md5';
import rd from 'rd';
import forEach from 'lodash/forEach';

const { readFileSync } = fs;
const { relative, join } = path;
const { eachFileFilterSync } = rd;

export default (dirs, base, json = {}, exclude = []) => {
  const newJson = {};

  dirs.forEach(dir => {
    eachFileFilterSync(dir, file => {
      if (exclude.find(ext => file.slice(0 - ext.length) === ext)) return;

      const key = relative(base, file);
      const content = readFileSync(file);
      newJson[key] = md5(content, 'hex');
    });
  });

  const changed = [];

  forEach(newJson, (value, key) => {
    if (json[key] !== value) {
      changed.push(join(base, key));
    }
  });

  return { json: newJson, changed };
};
