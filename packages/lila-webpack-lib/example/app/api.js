module.exports = {
  index: (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });

    res.end('index');
  },
};
