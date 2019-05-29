# Changelog

## 0.7.6

- Fix bug of `@lila/shell` `subprocess.stderr` being null.

## 0.7.5 [2019-05-23]

- `lila-webpack-config` add `rebuildWebpackConfig`.

## 0.7.3 [2019-04-19]

- `lila-tasks` add `@lila/sync-save-cache` task.
- `@lila/sync` add `cache, cacheFileName` options.

## 0.7.2 [2019-03-30]

- Add `create-lila-app` plugin.
- Add `lila-webpack-config` plugin.

## 0.7.1 [2019-03-11]

- Add `lila-webpack` plugin.

## 0.7.0 [2019-03-11]

- Remove `lila-webpack, lila-webpack-config, create-lila-app`.
- Remove `lila-webpack-lib, lila-webpack-lib-config, lila-rollup, lila-rollup-config`.

## 0.6.0 [2019-02-20]

- `lila-webpack-config, lila-webpack-lib-config, lila-rollup-config` add `ext` config option.
- `create-lila-app` types: `base, normal, react, vue, react-vue, normal-lib, react-lib, vue-lib, rollup`
- Split `lila-webpack-lib-config` into `base`, `for React`, `for Vue`
- Split `lila-webpack-config` into `base`, `for React`, `for Vue`, `for React + Vue`
- `lila-webpack` start command's data mocking functionality will cache node modules.

## 0.5.6 [2018-12-13]

- `lila-webpack` add `beforeCommand` config option.
- `lila-rollup-config` remove `alias, inject, ...` config options.
- `lila-rollup` remove `start` command.
- `lila-webpack-lib-config` add `extra` config option.
- `lila-webpack-config` add `splitChunks, extra` config options.
- `lila-webpack-config` remove `splitJs` config option.
- Fix bug of `/` can get mock data.

## 0.5.5 [2018-12-11]

- Add `lila.init.js`(`lila.js`), for windows.

## 0.5.4 [2018-12-06]

- Add `lila.success` api.
- Add `beforeTasks, afterTasks, errorTasks` settings.
- Add `excludeEntries` setting.
- Fix bug of `sub/*` not work.

## 0.5.3 [2018-12-01]

- Add `compile-js, compile-less, compile-scss` tasks.
- Add packages mode support(see [lerna](https://github.com/lerna/lerna)).
- Add `vue` support.
- Enhance mock functionality and modify `mockRoot` config option.

## 0.5.2 [2018-11-15]

- Update many features.
- Version wrong of `lila-bin, create-lila-app`.
- Fix bug of `lila-bin`.

## 0.5.0 [2018-11-13]

- Multiple packages.
- Rewrite core.
