import json from 'rollup-plugin-json';

const pkgName = process.env.PKG_NAME;

const fullPkgName =
  pkgName === 'create' ? 'create-lila-app' : `lila-${pkgName}`;

export default {
  input: `packages/${fullPkgName}/src/index.js`,
  output: {
    file: `packages/${fullPkgName}/lib/index.js`,
    format: 'cjs',
  },
  plugins: [json()],
};
