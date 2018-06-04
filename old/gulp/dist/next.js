
var distData = require('./data');

module.exports = {
    nextModule: (cb) => {
        distData.nextModule(!0);
        cb();
    }
};