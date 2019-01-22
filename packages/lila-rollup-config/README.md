# lila-rollup-config

Config generator for lila rollup plugin.

## install

```
npm install --save-dev lila-rollup-config
```

## use

In `lila.js`:

```
import rollupConfigPlugin from 'lila-rollup-config';

export default lila => {
  rollupConfigPlugin(lila);

  ...
};
```

## extended settings

### `rollupConfigGenerator`: see [rollupConfigGenerator](./src/index.js#L8)

### `getEntries`: see [makeGetEntries](./src/settings.js#L8)

`all, *` means all entries under `src`(`packages` if is packages mode) directory.

### `packages`: whether use packages mode

`type: bool/string` `default: false`

If you want packages mode(see [lerna](https://github.com/lerna/lerna)), you can configure `lila.setSetting('packages', true)`.

If so, building structure will be as follows:

```
|-- / root
  |-- packages/ packages directory
    |-- pkg1/ package 1
      |-- src/
      |-- build/
    |-- pkg2/ package 2
      |-- src/
      |-- build/
```

If you want to customize packages' directory, , you can configure `lila.setSetting('packages', 'yourCustomDirectory')`.

## extended configs

### `babelPresets`: extra babel presets

`type: []` `default: []`

### `babelPlugins`: extra babel plugins

`type: []` `default: []`

### `banner`: [rollup](https://rollupjs.org/guide/en) output banner

`type: string` `default: empty string`

### `filename`: library file name

`type: string` `default: empty string`

### `name`: [rollup](https://rollupjs.org/guide/en) output name

`type: string` `default: Index`

### `plugins`: extra rollup plugins

`type: []` `default: []`

## files of an entry

A entry has a standalone directory, also called workspace.

### for `build` command

For `build` command, an entry has at least a `index.js` file.

If `entry` is not provided, `@lila/index` will be used as default.

If entry is `@lila/index`, its workspace is `src`:

```
|-- src/
  |-- index.js

  |-- other files and directories
```

Others(entry is `main`), its workspace is `src/main`:

```
|-- src/
  |-- main/
    |-- index.js

    |-- other files and directories
```
