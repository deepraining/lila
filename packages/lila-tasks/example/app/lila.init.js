import fs from 'fs';

const { existsSync } = fs;

const serverPath = `${__dirname}/server.js`;
const sshConfig = existsSync(serverPath)
  ? require(serverPath) // eslint-disable-line
  : { host: '', username: '', password: '' };

const server = {
  ignoreErrors: true,
  sshConfig,
};

const remotePath = '/home/deepraining/space/www/lila/';

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

  if (entry === 'sync') {
    return [
      ['@lila/copy', { source: 'build-bak', target: 'build' }],
      ['@lila/sync', { src: 'build/**/*', server, remotePath, cache: !0 }],
      '@lila/sync-save-cache',
    ];
  }

  if (entry === 'sync-dir') {
    return [
      ['@lila/copy', { source: 'build-bak', target: 'build' }],
      ['@lila/sync-dir', { dirs: 'build', server, remotePath }],
    ];
  }

  if (entry === 'sync-build') {
    return [
      ['@lila/copy', { source: 'build-bak', target: 'build' }],
      ['@lila/sync-build', { server, remotePath }],
      ['@lila/sync-build', { server, remotePath, sourceMap: !1 }],
    ];
  }

  if (entry === 'sync-html') {
    return [
      ['@lila/copy', { source: 'build-bak', target: 'build' }],
      ['@lila/sync-html', { server, remotePath }],
      ['@lila/sync-html', { server, remotePath, ext: 'php' }],
    ];
  }

  if (entry === 'sync-source-map') {
    return [
      ['@lila/copy', { source: 'build-bak', target: 'build' }],
      ['@lila/sync-source-map', { server, remotePath }],
    ];
  }

  if (entry === 'remote-shell') {
    return [['@lila/remote-shell', { server, scripts: 'ls ~' }]];
  }

  if (entry === 'remote-exec') {
    return [['@lila/remote-exec', { server, scripts: 'ls ~' }]];
  }

  if (entry === 'ssh-exec') {
    return [['@lila/ssh-exec', { server: server.sshConfig, script: 'ls ~' }]];
  }

  if (entry === 'compile-js') {
    return [
      ['@lila/compile-js', { src: 'compile/**/*.js', dest: 'compile-es' }],
      [
        '@lila/compile-js',
        { src: 'compile/**/*.js', dest: 'compile-cjs', modules: 'cjs' },
      ],
      [
        '@lila/compile-js',
        { src: 'compile/**/*.js', dest: 'compile-amd', modules: 'amd' },
      ],
      [
        '@lila/compile-js',
        { src: 'compile/**/*.js', dest: 'compile-umd', modules: 'umd' },
      ],
    ];
  }

  if (entry === 'compile-less') {
    return [
      [
        '@lila/compile-less',
        { src: 'compile/**/*.less', dest: 'compile-less' },
      ],
    ];
  }

  if (entry === 'compile-scss') {
    return [
      [
        '@lila/compile-scss',
        { src: 'compile/**/*.{scss,sass}', dest: 'compile-scss' },
      ],
    ];
  }

  return [];
};

export default lila => {
  require('../../lib')(lila); // eslint-disable-line

  return ({ entry }) => ({
    tasks: getTasks(entry),
  });
};
