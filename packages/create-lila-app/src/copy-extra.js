import fse from 'fs-extra';
import path from 'path';

const { join } = path;
const { readFileSync, outputFileSync } = fse;

const extraDir = join(__dirname, '../extra');

export default (dir, file, name) => {
  const source = join(extraDir, `_${file}`);
  const target = join(dir, file);

  let content = readFileSync(source, 'utf8');

  content = content.replace('[project-name]', name);

  outputFileSync(target, content);
};
