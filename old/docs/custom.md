# Custom config for every module

1. defined in a `config.js` file of current workspace. 
    For example, if current module is `test/index`, the config js file is `src/test/index/config.js`.
2. the `config` attribute in this file can override the config value in `lila.config.js` of project root when building.

### example

```
module.exports = {
    // some config
}
```

Also, you can make different configs according to different environment, as follows.

```
module.exports = [
    // env == 0
    {
        // some config
    },
    // env == 1
    {
        // some config
    }
    // ...
]
```


