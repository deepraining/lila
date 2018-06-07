# Project config - servers

### `desc`: 

servers options

### `default`: 

empty

### `example`

```
[
    {
        type: "web/static"
        option: {...}
    }
    // ...
]
```

### `option`

Option to initialize sync component.

### what is serverType `static/web` means?

if you are using distributed servers, or just want to make html and other resources separately, and upload to different servers, here is what you are looking for.

* `web` means where to upload html files to. if `serverType: "web"`, html files will upload to it, relative to `dist` directory. 
* `static` means where to upload all resources to. if `serverType: "static"`, all built files will upload to it, relative to `config.webRoot` directory.
* you can use multi web servers and multi static servers, no upper limit.

### note

* currently only support [gulp-sftp](https://github.com/gtg092x/gulp-sftp).
* if you want to keep servers private, not in git control, you can define servers config in `lila.server.config.js`, and import it to `lila.config.js`.
