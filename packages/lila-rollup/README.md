# lila-rollup

Wrapped rollup plugin for building a library.

## install

```
npm install --save-dev lila-rollup
```

## use

In `lila.js`:

```
import rollupPlugin from 'lila-rollup';

export default lila => {
  rollupPlugin(lila);

  ...
};
```

## extended commands

### `build`: pack source codes to distribution bundles

```
lila build entry1 entry2 entry3 ...
```

If `entry` is not provided, `@lila/index` will be used as default.

## extended tasks

### `@lila/rollup`: run rollup

```
'@lila/rollup'
```

## settings need to be implemented

### `rollupConfigGenerator`: generate rollup config

```
rollup => ({entry, args, argv, cmd, config, lila}) => config
```

## settings can be implemented

### `getEntries`: get all entries with imported entries, when you want to use `*, all` special mark

```
(entries, root, srcDir) => allEntries;
```

## npm packages

- [rollup](https://github.com/rollup/rollup): 1.1.0
