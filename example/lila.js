const configGenerator = ({ page, cmd, argv }) => ({ page, cmd, argv });

module.exports = lila => {
  // init
  console.log(lila);

  return configGenerator;
};
