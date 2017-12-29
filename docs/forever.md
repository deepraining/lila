# With [forever](https://github.com/foreverjs/forever)

start servers, and not keep command line always being active.

```
lila forever <forever command name> [server type] [forever command args]
```

### arguments

* `forever command name`: reference to [forever](https://github.com/foreverjs/forever)
* `server type`: server type, default is `default` if not provided.
    - `default`: static server. make a static server, and take `basePaths.webRoot` as root directory.
    - `mock-express`: [express](https://github.com/expressjs/express) data mock server
* `forever command args`: forever arguments, reference to [forever](https://github.com/foreverjs/forever)

### example

* `lila forever start` : forever start static server 
* `lila forever stop` : forever stop static server 
* `lila forever restart` : forever restart static server
* `lila forever start default`: the same with `lila forever start`
* `lila forever start mock-express`: forever start express data mock server

