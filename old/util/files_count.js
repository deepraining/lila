
var rd = require('rd');

module.exports = (dir) => {

    var count = 0;

    rd.eachFileFilterSync(dir, () => {
        count += 1;
    });

    return count;
};
