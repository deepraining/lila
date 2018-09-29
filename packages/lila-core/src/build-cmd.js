import getConfigs from './get-configs';

export default (pages, argv) => {
  const configs = getConfigs(pages, argv, 'build');

  console.log(configs);
};
