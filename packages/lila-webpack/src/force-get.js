/**
 * Treat all request methods as `GET` method.
 * @param req
 * @param res
 * @param next
 */
export default (req, res, next) => {
  req.method = 'GET';
  next();
};
