# Project config - concatPriority

directory priority to concat `js/css`. default is `{}` 

### `example`

```
{
    // make all files under 'lib' or 'lib_extra' dicrectory into a separated file
    lib: ["lib", "lib_extra"],
    // make all files under 'common' dicrectory into a separated file
    common: "common"
}
```

### `explanation`

* `key`: name mark
* `value`: `string/array` directories( if js, relative to `dev/js`; if css, relative to `dev/css`)