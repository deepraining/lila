module.exports = lila => {
  require('../../lib')(lila); // eslint-disable-line

  return () => ({
    tasks: [],
  });
};
