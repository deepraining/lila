
const rd = require('rd');

module.exports = (dir) => {

    const count = 0;

    rd.eachFileFilterSync(dir, () => {
        count += 1;
    });

    return count;
};
