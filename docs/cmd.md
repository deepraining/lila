# command line

```
lila <command> [args]
```


### `new`: new a project

```
lila new projectName
```

### `add`: add a module

```
lila add moduleName
```

### `dev`: watch files' changes, with hot replacing and reloading, and start a local server for debug

```
lila dev moduleName
```

* can take with argument `local/l`, `out/o`

### `dist`: do production task.

```
lila dist moduleName [-e 0(1,2)] 
```

* can take with argument `env/e`, `local/l`, `out/o`

### `sync`: do production task, then upload production files to server

```
lila sync moduleName [-e 0(1,2)] 
```

* can take with argument `env/e`, `local/l`, `out/o`

### `analyze/ana`: visualize size of webpack output files with an interactive zoomable treemap

```
lila analyze moduleName
# or
lila ana moduleName
```

## arguments

### `env/e`: 

* specify current environment through command line, example:  `-e 0`, `-e 1`.
* if env is string, default is `test=0, prod/production=1`, or you can config it in `envAlias` of [project config](./config.md);
* if env is not provided, default is 0

### `local/l`

* specify current local value through command line

### `out/o`

* specify whether use out resolve alias

### `moduleName`

* `test/index`: a single file module
* `test/index,test/index2`: multi module
* `test/*` : wildcard, means all modules in directory `test`
* `test/index,test2/*` : multi modes
* `*` or `all` : specially, indicates all modules in current project(in linux or mac, you should use `all`, and `*` will not work)
