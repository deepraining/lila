
module.exports = {
    /**
     * in html, match js/css files
     *
     * prefix/32-hash.js
     * prefix/32-hash.css
     *
     * @param hashLength
     * @returns {RegExp}
     */
    newContent: hashLength => {
        return new RegExp(`/([0-9a-f]{${hashLength}})\\.`, 'g');
    },
    /**
     * match js/css file name
     *
     * 32-hash.js
     * 32-hash.css
     *
     * @param hashLength
     * @returns {RegExp}
     */
    newFileName: hashLength => {
        return new RegExp(`^([0-9a-f]{${hashLength}})\\.`, 'g');
    },
    /**
     * match common js file name
     *
     * prefix/32-hash.js
     *
     * @param hashLength
     * @returns {RegExp}
     */
    jsFileName: hashLength => {
        return new RegExp(`/[0-9a-f]{${hashLength}}\\.js$`, 'i');
    },
    /**
     * match js chunk file name
     *
     * {"0":"7b7c4210539c2c41354207f419ec0249","1":"721ea8e8a5ae693fd7ed70b501c7d28c","2":"e2025f09faac9dd460cbac6913cfbda6"}
     *
     * @param hashLength
     * @returns {RegExp}
     */
    jsChunkContent: hashLength => {
        return new RegExp(`["']([0-9a-f]{${hashLength}})["']`, 'g');
    },
    /**
     * match chunk js file name
     *
     * prefix/123.32-hash.js
     *
     * @param hashLength
     * @returns {RegExp}
     */
    jsChunkFileName: hashLength => {
        return new RegExp(`/[0-9]{1,}\\.[0-9a-f]{${hashLength}}\\.js$`, 'i');
    }
};
