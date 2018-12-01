module.exports = {
  str: 'str',
  obj: { obj: 1 },
  func: (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });

    res.end('func');
  },
};
