# Changelog

## 0.4.3 [2018-11-28]

- `gulp@2.0.1` to replace `gulp@git://github.com/senntyou/gulp-cli.git#6f9e0ef`

## 0.4.2 [2018-10-15]

- Remove `add` command.
- Add `flow, flowRuntime` config options.

## 0.4.1 [2018-08-01]

- Remove `upgrade` command.
- Remove `onlyWebpack` option.
- Remove `esLintOptions, esLintFix, styleLintOptions, styleLintFix, prettierOptions` option.
- Remove `esLint, styleLint, prettier` option.
- Remove `eslint,stylelint,prettier` command.
- Update `project_files/root/_package.json`.

## 0.4.0 [2018-07-26]

- Remove `archive,arc,clean,revert` all server-side commands. 
- Remove `ana` command.
- Fix bug of `eslint,stylelint,prettier` supporting `test/index,test-2/*` multi mode module. 

## 0.3.2 [2018-07-10]

- Fix bugs `*` module for `prettier, eslint, stylelint` commands on `linux, mac`.

## 0.3.1 [2018-07-09]

- Add `upgrade` command.
- Add `esLint, styleLint, prettier` option.
- Add `prettierOptions` option.
- Add `prettier` command.
- Add `styleLintOptions, styleLintFix` option.
- Add `stylelint` command.
- Add `esLintOptions, esLintFix` option.
- Add `eslint` command.
- Add `mock` config option and `js` mock files support.
- Use `cssModules` to replace `enableCssModules`.
- `moduleOptions` add multiple modules `test-1/*,test-2/name` support.
- Add `cssModulesName` config option.

## 0.3.0 [2018-06-13]

- Rewrite core code.
- Rewrite documents.
- Remove `ignoreNodeModules, network, analyzerPort, browsers` config option.
- Add `webpack, rules, plugins, hotModuleReplacement, htmlWebpack, bundleAnalyzer, builtinRules, babelLoaderPresets, babelLoaderPlugins, babelLoaderExclude, onlyWebpack, minJsOptions, minCssOptions, minHtmlOptions, servers, beforeFormatConfig, webpackDev, webpackHot, writeFile, moduleOptions` config option.
- Use `babelLoaderExclude` to replace `ignoreNodeModules`.
- Use `servers` to replace `network`.
- Use `bundleAnalyzer` to replace `analyzerPort`.
- Use `moduleOptions` to replace `config.js` of each module's custom config.

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
