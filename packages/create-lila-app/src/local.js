import path from 'path';

let corePkg;
let core;

try {
  /**
   * resolved core file path
   *
   * @example path/to/project/node_modules/_lila-core@0.5.0@lila-core/lib/index.js
   *
   * @type {String}
   */
  const resolvedCore = require.resolve('lila-core');
  const corePath = path.join(
    resolvedCore.split('node_modules')[0],
    'node_modules/lila-core'
  );
  const corePkgPath = path.join(corePath, 'package.json');

  core = require(corePath); // eslint-disable-line
  corePkg = require(corePkgPath); // eslint-disable-line
} catch (e) {
  // eslint-disable no-empty
}

export const lilaCore = core;
export const lilaCorePkg = corePkg;
