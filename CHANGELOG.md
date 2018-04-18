# lila changelog

## 0.2.0

- add `all` special module.
- remove `cssAbsolutePathPrefix, htmlAbsolutePathPrefix, htmlAbsoluteSuffixes` config option
- add `staticServerUrl` config option

## 0.1.5

- add `delete dev` for analyze command

## 0.1.4

- add `analyze, ana` cmd
- add `analyzerPort` config option

## 0.1.3

- add `treatAllMethodsAsGet, browserSync` config option.

## 0.1.2

- fix bug of all commands needing local `lila`.

## 0.1.1

- fix bug of `clean` cmd will remove `jpg, png, ...` resource files.

## 0.1.0

- remove `splitJsMap` config, leave `splitJs`
- redefine directory structure
- rename `buildOptions` to `envOptions`
- remove `init-clean` command
- remove `doc` command
- remove `mock-express` command

## 0.0.6

- add `renameHtml` config option

## 0.0.5

- add `htmlAbsoluteSuffixes` config option
- fix `-v, -h` not working bug
- force minify css remove all comments

## 0.0.4

- add `provide` config option
- add `fileLoaderSuffixes` config option
- remove `cssAbsolutePath` config option

## 0.0.3

- make `network` instead of `networkOptions`

## 0.0.2

- add two js entry module support: `test/inner.js`, `test/inner/index.js` (module: `test/inner`)
- fixed fatal bugs by add `local lila`
- remove `forever` related, for non-using
- add `ignoreNodeModules` config option

## 0.0.1

- add `new` command
- add `add` command
- add `dev` command
- add `mock-express` command
- add `forever` command
- add `doc` command
- add `archive/arc` command
- add `init-clean` command
- add `clean` command
- add `revert` command
- add `dist` command
- add `sync` command