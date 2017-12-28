# With [forever](https://github.com/foreverjs/forever)

start servers, and not keep command line always being active.

```
lila forever <forever command name> [server type] [forever command args]
```

### arguments

* `forever command name`: reference to [forever](https://github.com/foreverjs/forever)
* `server type`: server type, default is `default` if not provided.
    - `default`: local server
    - `mock-express`: [express](https://github.com/expressjs/express) data mock server
* `forever command args`: forever arguments, reference to [forever](https://github.com/foreverjs/forever)

### example

* `lila forever start` : forever start local server 
* `lila forever stop` : forever stop local server 
* `lila forever restart` : forever restart local server
* `lila forever start default`: the same with `lila forever start`
* `lila forever start mock-express`: forever start express data mock server

