# Project config - servers

```
[
    {
        type: "web/static"
        options: {...}
    }
    // ...
]
```

### `type`

* `web`: Where to sync html files to. All paths are relative to `dist` directory.
* `static`: Where to sync static files to. All paths are relative to `config.webRoot` directory.

Default is `static`.

### `options`

Options to initialize sync component.

Currently only support [gulp-ssh](https://github.com/teambition/gulp-ssh).

```
options: {
    ignoreErrors: true,
    sshConfig: {
        host: 'host',
        username: 'username',
        password: 'password'
    }
}
```

### What is serverType `static/web` means?

If you are using distributed servers, or just want to make html separately with other resources, and upload to different servers, here is what you are looking for.

* `web` means where to upload html files to. 
* `static` means where to upload all static resources to. 
* You can use multiple web servers and multiple static servers.

### note

* If you want to keep servers private, not in git control, you can define servers config in `lila.server.config.js`, and import it to `lila.config.js`.
