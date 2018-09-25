const suffixes = {
  1: 'st',
  2: 'nd',
  3: 'rd',
};

/**
 * Get sequence suffix according to index.
 *
 * @param index
 * @returns {*|string}
 */
module.exports = index => {
  return suffixes[index || 0] || 'th';
};
