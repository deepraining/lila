export const str = 'str';
export const obj = { obj: 1 };
export const func = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });

  res.end('func');
};
