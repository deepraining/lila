import minimist from 'minimist';
import json from 'rollup-plugin-json';

const argv = minimist(process.argv.slice(2));
const names = argv.name.split(',');

const fullNames = names.map(
  name => (name === 'create' ? 'create-lila-app' : `lila-${name}`)
);

export default fullNames.map(name => ({
  input: `packages/${name}/src/index.js`,
  output: {
    file: `packages/${name}/lib/index.js`,
    format: 'cjs',
  },
  plugins: [json()],
}));
