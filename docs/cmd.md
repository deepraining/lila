# command line

```
lila <command> [args]
```

## detail commands

### `new`: new a project

```
lila new projectName
```

### `add`: add a module to current directory

```
lila add moduleName
```

### `watch`: watch files' changes, and compile files from `src` to `dev`

```
lila watch
```

### `server`: start a local server for debug

```
lila server moduleName
```

### `dev`: watch files' changes, and compile files from `src` to `dev`, and start a local server for debug

```
lila dev moduleName
```

### `dist`: do production task.

```
lila dist moduleName [-e 0(1,2)] 
```

* can take with argument env/e

### `sync`: upload production files to server

```
lila sync moduleName [-e 0(1,2)] 
```

* can take with argument env/e

### `compile/cp`: compile files from `src` to `dev` manually

```
lila compile module
# or
lila cp module
```

* `module`: moduleName + fileExtensionName(if fileExtensionName is not provided, default is js), example: `test/index.js`, `test/index.less`
* support [glob](https://github.com/isaacs/node-glob) semantics, example: `**/*.js`, `test/**/*`, `test/*.less`

### `mock-express`: use [express](https://github.com/expressjs/express) to provide data mock

```
lila mock-express
```

detail: [mock-express](./express.md)

### `forever`: do with [forever](https://github.com/foreverjs/forever)

```
lila forever <forever command name> [forever command args]
```

detail: [do with forever](./forever.md)

### `doc`: generate `js` documents

```
lila doc
```

* documents will be in `docs` of project root directory(if exists, it'll be overridden').

### `dist-js`: make javascript files as main module, and do production task.

```
lila dist-js module [-e 0(1,2)] 
```

* `module`: js module name
* support [glob](https://github.com/isaacs/node-glob) semantics, example: `**/*`, `test/**/*`, `test/*`
* can take with argument env/e


### `sync-js`: make javascript files as main module, and do production task, then sync files to remote.

```
lila sync-js module [-e 0(1,2)] 
```

* `module`: js module name
* support [glob](https://github.com/isaacs/node-glob) semantics, example: `**/*`, `test/**/*`, `test/*`
* can take with argument env/e

### `dist-css`: make css files as main module, and do production task.

```
lila dist-css module [-e 0(1,2)] 
```

* `module`: css module name
* support [glob](https://github.com/isaacs/node-glob) semantics, example: `**/*`, `test/**/*`, `test/*`
* can take with argument env/e


### `sync-css`: make css files as main module, and do production task, then sync files to remote.

```
lila sync-css module [-e 0(1,2)] 
```

* `module`: css module name
* support [glob](https://github.com/isaacs/node-glob) semantics, example: `**/*`, `test/**/*`, `test/*`
* can take with argument env/e

## arguments

### `env/e`: 

* specify current environment through command line, example:  `-e 0` or `-e test`, `-e 1`, or `-e prod`.
* if env is string, default is `test=0, prod/production=1`, or you can config it in envAlias of [project config](./config.md);
* if env is not provided, default is 0

### `moduleName`

* `test/index`: a single file module
* `test/index,test/index2`: multi module
* `test/*` : wildcard, means all modules in directory `test`
* `test/index,test2/*` : multi modes
* `*` : specially, indicates all modules in current project
