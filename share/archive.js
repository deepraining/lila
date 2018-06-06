
const logger = require('../util/logger');

const share = {
    // File name of zip.
    zipFileName: ''
};

// End handler after archive.
share.endHandler = cb => {
    logger.success(`
    Pack 'dist' directory successfully!
    
    You can it '${share.zipFileName}' in current directory.
    `);

    cb();
};

module.exports = share;
