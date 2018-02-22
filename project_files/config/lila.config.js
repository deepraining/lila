
"use strict";

module.exports = {
    /**
     * network, do following works:
     *     1. how many machines
     *     2. whether use distributed servers
     *     3. how to ensure html/css inline reference
     *     ...
     */
    network: [
        {
            servers: [
                {
                    host: "xx.xx.xx.xx",
                    user: "user",
                    pass: "password",
                    remotePath: "remotePath"
                }
            ]
        }
        // ...
    ],
    /**
     * build option of different environments
     */
    envOptions: [
        {}
        // ...
    ]
};

