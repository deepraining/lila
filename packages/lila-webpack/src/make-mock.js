import fs from 'fs';
import path from 'path';
import trimEnd from 'lodash/trimEnd';

export default webRoot => (req, res, next) => {
  // url?key1=value1
  let url = req.url.split('?')[0];

  // path/to/index/
  url = trimEnd(url, '/');

  const urls = url.split('/');
  const filename = urls[urls.length - 1];

  // Don't have `.`
  if (filename.indexOf('.') < 0) {
    const filePath = path.join(webRoot, `${url}.js`);
    if (fs.existsSync(filePath)) {
      // Disable cache.
      if (require.cache[filePath]) delete require.cache[filePath];
      require(filePath)(req, res); // eslint-disable-line
      return;
    }
  }

  next();
};
