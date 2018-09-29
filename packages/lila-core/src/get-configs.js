import app from './app';

export default (pages, argv, cmd) => {
  const { lila } = app;
  const { makeConfig } = lila;

  return pages.map(page => makeConfig({ page, cmd }, argv));
};
