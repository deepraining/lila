import { cssLoader, lessLoader, sassLoader } from './rules';
import { defaultBrowsers } from './defaults';

export const styleLoaders = ({ config, isBuild = !1 }) => {
  const {
    browsers = defaultBrowsers,
    sassResources,
  } = config;
  const rules = [];

  const options = {
    browsers,
    isBuild,
    sassResources,
  };

  rules.push(cssLoader(options), lessLoader(options), sassLoader(options));

  return rules;
};

// placeholder
export default {};
