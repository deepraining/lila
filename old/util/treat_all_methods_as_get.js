
module.exports = (req, res, next) => {
    req.method = 'GET';
    next();
};