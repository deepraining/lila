# Changelog

## 0.3.0

- Rewrite core code. 
- Remove `network` config option. 
- Rename `ignoreNodeModules` to `babelLoaderExclude`. 

## 0.2.2

- Add `commandOptions` option.
- Add `define` option.
- Add `cssModulesExclude` config option(default is `[/node_modules/]`).
- Add `autoprefixer` support & `browsers` option.

## 0.2.1

- Modify `resolveModules` sequence.
- Announcing that the css module must be defined before js module in `resolveModules, outResolveAlias`.
- Use `transform-react-jsx` by `require("babel-plugin-transform-react-jsx")`.
- Add `import` config option.
- Add `friendly-errors-webpack-plugin`.
- Add `enableCssModules` config option and [css modules](https://github.com/css-modules/css-modules) support.

## 0.2.0

- Add `all` special module.
- Remove `cssAbsolutePathPrefix, htmlAbsolutePathPrefix, htmlAbsoluteSuffixes` config option.
- Add `staticServerUrl` config option.
- Add `require.ensure(), import()` support.
- Add `resolveModules` config option.
- Add `local, localOptions` config option.
- Add `out, outResolveAlias` config option.

## 0.1.5

- Add `delete dev` for analyze command.

## 0.1.4

- Add `analyze, ana` cmd.
- Add `analyzerPort` config option.

## 0.1.3

- Add `treatAllMethodsAsGet, browserSync` config option.
