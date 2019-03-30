import { cssLoader, lessLoader, sassLoader } from './rules';
import { defaultBrowsers } from './defaults';

export const styleLoaders = ({ config, isBuild = !1 }) => {
  const {
    cssModules = !1,
    cssModulesName,
    cssModulesExclude = [/node_modules/],
    browsers = defaultBrowsers,
  } = config;
  const rules = [];

  if (cssModules) {
    const options = {
      cssModules,
      cssModulesName,
      cssModulesExclude,
      browsers,
      isBuild,
    };
    const excludeOptions = { ...options, exclude: !0 };
    const includeOptions = { ...options, exclude: !1 };
    rules.push(
      cssLoader(excludeOptions),
      cssLoader(includeOptions),
      lessLoader(excludeOptions),
      lessLoader(includeOptions),
      sassLoader(excludeOptions),
      sassLoader(includeOptions)
    );
  } else {
    const options = {
      cssModules,
      cssModulesName,
      cssModulesExclude,
      browsers,
      isBuild,
    };

    rules.push(cssLoader(options), lessLoader(options), sassLoader(options));
  }

  return rules;
};

// placeholder
export default {};
