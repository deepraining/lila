const getTasks = entry => {
  if (entry === 'file') {
    const file = 'target/index.html';
    return [
      [
        '@lila/make',
        {
          file,
          content: '{{pre}}<h1>hello</h1>{{post}}',
          force: !0,
        },
      ],
      [
        '@lila/replace',
        {
          file,
          replace: [
            { target: '{{pre}}', replacement: '<p>pre</p>' },
            { target: /{{post}}/, replacement: '<p>post</p>' },
          ],
        },
      ],
      ['@lila/insert', { file, start: '<p>start</p>', end: '<p>end</p>' }],
      ['@lila/backup', { file }],
      ['@lila/convert', { file, ext: 'php', force: !0 }],
    ];
  }

  return [];
};

module.exports = lila => {
  require('../../lib')(lila); // eslint-disable-line

  return ({ entry }) => ({
    tasks: getTasks(entry),
  });
};
