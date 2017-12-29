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

### `dist`: do production task.

```
lila dist moduleName [-e 0(1,2)] 
```

* can take with argument `env/e`

### `sync`: do production task, then upload production files to server

```
lila sync moduleName [-e 0(1,2)] 
```

* can take with argument `env/e`

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

## arguments

### `env/e`: 

* specify current environment through command line, example:  `-e 0`, `-e 1`.
* if env is string, default is `test=0, prod/production=1`, or you can config it in envAlias of [project config](./config.md);
* if env is not provided, default is 0

### `moduleName`

* `test/index`: a single file module
* `test/index,test/index2`: multi module
* `test/*` : wildcard, means all modules in directory `test`
* `test/index,test2/*` : multi modes
* `*` : specially, indicates all modules in current project
