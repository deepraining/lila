# server side command line

commands to manage server side production files.

## detail commands 

### `archive/arc`: archive files of dist directory into a zip package 

```
lilacs archive
# or
lilacs arc
```

* current working directory should be the parent directory of dist.
* this command just do with dist directory, if you want to archive the whole project, please use your own way.

### `clean`: clean redundant hash-code-suffix files which created by revision, and are not used anymore.  

```
lilacs clean
```

* current working directory should be the parent directory of dist.
* before execute this command, `archive` will be automaticly executed once.
* after executing this command, you should remove `manifests` directory in root of project. 

### `init-clean`: initialize config file which command `clean` needed.

```
lilacs init-clean
```

* this command will generate a `lilacs.clean.config.js` in current working directory, and you can modify it as you want.

### `revert`: revert dist directory to last state.

```
lilacs revert [-i,--index(1,2,3)]
```

* current working directory should be the parent directory of dist.
* this command will be used after done `clean` command, and you want to restore it.
* can take with argument `index(i)`, to specify revert to last nth state, default is `1`