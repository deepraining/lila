
const data = require('./data');

module.exports = {
    nextModule: (cb) => {
        data.nextModule(!0);
        cb();
    }
};
