
module.exports = {
    newContent: (hashLength) => {
        return new RegExp(`\\.([0-9a-f]{${hashLength}})[\\.'"]`, 'g');
    },
    newFileName: (hashLength) => {
        return new RegExp(`\\.([0-9a-f]{${hashLength}})\\.`, 'g');
    }
};
