import fs from 'fs';
import path from 'path';
import trimEnd from 'lodash/trimEnd';

const { existsSync } = fs;
const { join } = path;

export default root => (req, res, next) => {
  // path/to/index/?key1=value1
  const url = trimEnd(req.url.split('?')[0], '/');

  // Don't have `.`
  if (
    url
      .split('/')
      .slice(-1)[0]
      .indexOf('.') < 0
  ) {
    const filePath = join(root, `${url}.js`);
    if (existsSync(filePath)) {
      // Disable cache.
      if (require.cache[filePath]) delete require.cache[filePath];
      require(filePath)(req, res); // eslint-disable-line
      return;
    }
  }

  next();
};
