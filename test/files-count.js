const rd = require('rd');

const { eachFileFilterSync } = rd;

module.exports = (dir, extension) => {
  let count = 0;

  eachFileFilterSync(dir, file => {
    if (!extension) count += 1;
    else if (file.slice(0 - extension.length) === extension) count += 1;
  });

  return count;
};
