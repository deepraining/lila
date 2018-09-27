import fs from 'fs';
import path from 'path';

const corePath = path.join(process.cwd(), 'node_modules/lila-core');
const corePkgPath = path.join(corePath, 'package.json');

const localExists = fs.existsSync(corePkgPath);

export const corePkg = localExists ? require(corePkgPath) : undefined; // eslint-disable-line
export const core = localExists ? require(corePath) : undefined; // eslint-disable-line
