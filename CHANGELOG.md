# lilacs changelog

## 0.5.5

- change `gulp#4.0` to `gulp#6d71a65`

## 0.5.4

- Fix bug of chinese character being encoded after building(set `cheerio.load` `decodeEntities: false`).
- Add `cssAutoPrefix`, `autoPrefixOption` config attribute, indicates whether auto add vendor prefixes to rules of css.
- Acquiescently, all js/css files will be merged into one single file, if concat.

## 0.5.3

- Fix error caused by alias directory of requireJs config paths. Such as `jquery-ui: lib/jquery-ui` 

## 0.5.1

- Add `dist-js` command
- Add `sync-js` command
- Add `dist-css` command
- Add `sync-css` command
- Add `webpack` building support
- Add `react` framework support
- Add `useWebpack`, `resolveAlias`, `packCssSeparately`, `splitJs`, `splitJsMap` configs.

## 0.5.0

- New version, with many updates.
- Rewrite core scripts, with some new command names, and some new config options. 