# Develop with distributed intermediate layer node.js application.

## Requirements.

* [nodemon](https://github.com/remy/nodemon): Monitor for any changes in your node.js application and automatically restart the server - perfect for development.

## Go.

1. Change directory: `cd path/to/current`(`current` means parent directory of current `README.md`);
2. Install packages: `npm install`;
3. Configure `lila.config.js`'s `writeFile` to `true`: `{ writeFile: true }`;
4. Start lila for development: `node index.js`(`lila dev test/index`);
5. Start `app.js` for development: `nodemon demo/app.js`;
6. Open `http://localhost:3000` in browser;
7. Modify files under `demo/project/src/test/index/`, and refresh the browser to see changes;
8. Modify `app.js`, and refresh the browser to see changes in both browser and command line.
