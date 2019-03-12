import fs from 'fs';
import minimist from 'minimist';
import json from 'rollup-plugin-json';

const { readdirSync } = fs;

const argv = minimist(process.argv.slice(2));
const { name } = argv;
const names =
  name === 'all'
    ? readdirSync('packages')
    : name.split(',').map(n => `lila-${n}`);

export default names.map(n => ({
  input: `packages/${n}/src/index.js`,
  output: {
    file: `packages/${n}/lib/index.js`,
    format: 'cjs',
  },
  plugins: [json()],
}));
