# Project config - network

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

* `web` means where to upload html files to. if `serverType: "web"`, html files will upload to it, relative to `dist` directory. 
* `static` means where to upload all resources to. if `serverType: "static"`, all built files will upload to it, relative to `config.webRoot` directory.
* you can use multi web servers and multi static servers, no upper limit.

### note

* if you want to keep servers private, not in git control, you can define servers config in `lila.server.config.js`, and import it to `lila.config.js`.
        