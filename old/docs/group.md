# Group of modules

defined in `lila.config.js` of project.

if you always handle the same multi modules, you can make those modules as a group, 
and next time just input the groupName instead of multi modules when build. 

### example

```
moduleGroup: {
    // groupName -> modules[array]
    group1: [
        "test/index",
        "test/index2"
        // ...
    ]
}
```

### note

* groupName should not conflict with existed moduleName. 