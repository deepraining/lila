import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import json from 'rollup-plugin-json';
import aliasPlugin from 'rollup-plugin-alias';
import injectPlugin from 'rollup-plugin-inject';
import globals from 'rollup-plugin-node-globals';
import uglify from 'rollup-plugin-uglify';

export default (lila, rollup, { cmd, config }) => {
  const {
    babelImport = [],
    babelComponent = [],
    babelExclude = [/node_modules/],
    babelPresets = [],
    babelPlugins = [],
    alias = {},
    inject = {
      include: ['**/*.js', '**/*.jsx'],
      exclude: 'node_modules/**',
    },
    flow = !1,
    flowRuntime = !1,
    minJs = !0,
    minCss = !0,
  } = config;

  const isBuild = cmd === 'build';

  return {
    plugins: [
      // babel should be in the first
      babel({
        exclude: babelExclude,
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          ...babelPresets,
          ...(flow ? ['@babel/preset-flow'] : []),
        ],
        plugins: [
          '@babel/plugin-transform-react-jsx',
          '@babel/plugin-syntax-dynamic-import',
          ...(Array.isArray(babelImport) ? babelImport : [babelImport]).map(
            i => ['import', ...(Array.isArray(i) ? i : [i])]
          ),
          ...(Array.isArray(babelComponent)
            ? babelComponent
            : [babelComponent]
          ).map(i => ['component', ...(Array.isArray(i) ? i : [i])]),
          ...babelPlugins,
          ...(flowRuntime
            ? [['flow-runtime', { assert: !0, annotate: !0 }]]
            : []),
        ],
      }),
      aliasPlugin(alias),
      ...(isBuild ? [] : [resolve()]),
      json(),
      commonjs(),
      injectPlugin(inject),
      globals(),
      postcss({ extract: !0, minimize: isBuild && minCss }),
      ...(isBuild && minJs ? [uglify()] : []),
    ],
  };
};
