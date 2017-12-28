# With [forever](https://github.com/foreverjs/forever)

start servers, and not keep command line always being active.

```
lilacs forever <forever command name> [server type] [forever command args]
```

### arguments

* `forever command name`: reference to [forever](https://github.com/foreverjs/forever)
* `server type`: server type, default is `default` if not provided.
    - `default`: local server
    - `mock-express`: [express](https://github.com/expressjs/express) data mock server
* `forever command args`: forever arguments, reference to [forever](https://github.com/foreverjs/forever)

### example

* `lilacs forever start` : forever start local server 
* `lilacs forever stop` : forever stop local server 
* `lilacs forever restart` : forever restart local server
* `lilacs forever start default`: the same with `lilacs forever start`
* `lilacs forever start mock-express`: forever start express data mock server

