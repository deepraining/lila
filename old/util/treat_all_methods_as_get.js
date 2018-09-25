/**
 * Treat all request methods as `GET` method.
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
  req.method = 'GET';
  next();
};
