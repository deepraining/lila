# Project config - networkOptions

### `desc`: 

network options

### `default`: 

empty

### `example`

```
[
    // env == 0
    {
        useSsh: false,
        staticDomain: "",
        cssAbsolutePathPrefix: "",
        backupHtml: false,
        servers: [
            {
                host: "xx.xx.xx.xx",
                port: 21,
                user: "user",
                pass: "password",
                remotePath: "remotePath",
                useSsh: false,
                serverType: "static"
            }
            // ...
        ]
    }
    // ...
]
```

### `explanation`

* `useSsh`: whether use sftp to upload files, default is ftp
    - `default`: `false`
* `staticDomain`: static server domain.
    - `default`: `""`
    - `example`:  
        - http://www.example.com, 
        - http://www.example.com/sub_dir, 
        - http://www.example.com/sub_dir/sub_sub_dir
* `cssAbsolutePathPrefix`: prefix to be prepended to absolute path in css files.
    - `default`: `""`
    - `where to use`: if the staticDomain is not a totally root server, but a sub directory, like http://www.example.com/sub_dir, and thus, absolute reference in css will not work correctly, here is to solve this problem.
* `backupHtml`: whether backup html or converted file from html after each building.
    - `default`: `false`

### `server explanation`

* `host`: remote host
* `port`: host port, if not provided, default is 21 when useSsh is false, 22 when useSsh is true
* `user`: remote host user
* `pass`: remote host password
* `remotePath`: remote host path to upload files to.
* `useSsh`: whether use sftp. if not provided, but `option.useSsh` is provided, will use `option.useSsh` instead, or is false.
* `serverType`: `static` or `web`, default is `static`.

### what is serverType `static/web` means?

if you are using distributed servers, or just want to make html and other resources separately, and upload to different servers, here is what you are looking for.

* `web` means where to upload html files to. if `serverType: "web"`, html files will uploaded, relative to `dist` directory. 
* `static` means where to upload all resources to. if `serverType: "web"`, all built files will uploaded, relative to `config.webRoot` directory.
* you can use multi web servers and multi static servers, no upper limit.

### note

* if you want to keep servers private, not in git control, you can define servers config in `lila.server.config.js`, and import it to `lila.config.js`.
        