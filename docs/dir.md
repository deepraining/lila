# Directory specification

## base structure

```
| - / (root)
    | - src (source)
    | - dev (develop)
    | - dist (production)
    | - images (image files)
    | - fonts (font files)
    | - data (mock api)
    | - media (audio, video, ...)
    | - resources (other)
    | - ...
```

* `src`: Source directory. All files in this directory are to be compiled into dev directory. 
         Currently support [less](https://github.com/less/less.js), `es6`  
* `dev`: Develop directory. All files in this directory are used to debug in browser, and html/js/css files can run originally in browser. 
* `dist`: Production directory. Generated after building. 


## `src, dev, dist` directory structure

```
| - src/dev/dist
    | - js
    | - css
    | - html
```

## recommended `js, css` directory structure
 
```
| - js/css
    | - common (common directory)
    | - lib (library directory)
    | - lib_extra (library directory, and files in this directory are modified for current project)
    | - ...
    | - other module
```

## recommended `lib, lib_extra` directory structure

```
| - lib/lib_extra
    | - package
        | - file
```

example: 
`jquery`: `lib/jquery/jquery.js`
`bootstrap`: `lib/bootstrap/bootstrap.css`