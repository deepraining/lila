# Files&directories mapping

defined in `lilacs.config.js` of project, and handle `dev` directory.

## files mapping

### example

```
filesMap: [
    // env == 0
    {
        // "module/name.ext" : "module/new_name.ext"
        "test/index.html": "test/index_new.html",
        "test/index.css": "test/index_new.css",
        "test/index.js": "test/index_new.js"
    }
    // ...
]
```

### explanation

* key&value: module + extension, extension can be one of html/js/css.
* key: actually existed module file, and will be replaced when building.
* value: to replace other module file when building.

### note

* mapped file and target file should be the same directory. 

## directories mapping

### example

```
dirsMap: [
    // env == 0
    {
        // "js/css/html dir" : "new dir"
        "html/test": "html/test_new",
        "js/test": "js/test_new",
        "css/test": "css/test_new",
    }
    // ...
]
```

### explanation

* key&value: dirType + dir, dirType can be one of html/js/css.
* key: actually existed directory, and will be replaced when building.
* value: to replace other directory when building.

### note

* it's recommended not use directory mapping to html, when you use `requireJs`.