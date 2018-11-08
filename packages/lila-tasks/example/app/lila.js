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

  if (entry === 'dir') {
    return [
      ['@lila/make', { file: 'dev/.keep' }],
      ['@lila/make', { file: 'build/.keep' }],
      ['@lila/make', { file: '.lila/.keep' }],
      ['@lila/copy', { source: 'dev', target: 'ddev' }],
      ['@lila/move', { source: 'ddev/.keep', target: 'bbuild/.keep' }],
    ];
  }

  if (entry === 'del') {
    return [
      '@lila/del-dev',
      '@lila/del-build',
      '@lila/del-tmp',
      ['@lila/del', ['ddev', 'bbuild']],
    ];
  }

  if (entry === 'shell') {
    return [
      ['@lila/shell', { command: 'mkdir', args: [`${__dirname}/shell`] }],
      ['@lila/shell', { command: 'touch', args: [`${__dirname}/shell/.keep`] }],
    ];
  }

  if (entry === 'cache') {
    return [
      ['@lila/copy', { source: 'build-bak', target: 'build' }],
      ['@lila/clean-cache', { dir: 'build' }],
      ['@lila/save-cache', { dir: 'build' }],
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
