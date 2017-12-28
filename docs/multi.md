# multi js entry modules

if js resources of a html are huge or you are just make a single page application, 
and do not want load js resources one time, you can make multi js entry modules, 
so you can load js resources in different time and different place. 

1. define a `js` file of the same directory of html, and with the same name of the html. 
    For example, if current module is `test/index`, the html is `test/index.html`, and the config js file is `test/index.js`.
2. define `extraJsEntryModules` attribute.

```
module.exports = {
    // one
    extraJsEntryModules: "test/index_2",
    // or multiple
    extraJsEntryModules: [
        "test/index_2",
        "test/index_3"
    ]
};
```

### note

* `requireJsToTagLoad` and `concatJs` can't do with these js modules.