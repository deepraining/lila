# Custom config for every module

1. defined in a `js` file of the same directory of html, and with the same name of the html. 
    For example, if current module is `test/index`, the html is `test/index.html`, and the config js file is `test/index.js`.
2. the `config` attribute in this file can override the config value in `lilacs.config.js` of project root when building.

### example

```
module.exports = {
    config: {
        // some config
    }
}
```

Also, you can make different configs according to different environment, like following.

```
module.exports = {
    config: [
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
}
```


