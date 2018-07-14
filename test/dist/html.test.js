const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');

const filesCount = require('../../util/files_count');

const demoDir = path.join(__dirname, 'demo');
const fixtureDir = path.join(__dirname, 'fixtures/html');
const distDir = path.join(fixtureDir, 'project/dist');

describe('dist html', () => {
  // 60s timeout
  jest.setTimeout(60000);

  beforeAll(() => {
    fse.copySync(demoDir, fixtureDir);
  });
  afterAll(() => {
    if (fs.existsSync(fixtureDir)) {
      fse.removeSync(fixtureDir);
    }
  });

  test('dist: html', done => {
    const child = spawn('node', [path.join(__dirname, 'dist.js')], {
      env: Object.assign({}, process.env, {
        local: 'html',
        fixtureDir: 'fixtures/html',
      }),
    });

    let stdoutMessage;

    child.stdout.on('data', data => {
      stdoutMessage = data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      // Has stdout
      expect(stdoutMessage).not.toBeUndefined();
      // Has stdout
      expect(stdoutMessage).toContain('Pack source codes and static files into production successfully.');
      // Additional php file.
      expect(filesCount(distDir)).toBe(5);
      expect(fs.existsSync(path.join(distDir, 'html/test/index.php'))).toBeTruthy();

      const phpContent = fse.readFileSync(path.join(distDir, 'html/test/index.php'), 'utf8');
      const phpContents = phpContent.split('\n');

      expect(phpContent).toContain('Hello Lila!');
      expect(phpContent).not.toContain('Hello World!');
      expect(phpContents[0]).toContain('<!-- start -->');
      expect(phpContents[phpContents.length - 1]).toContain('<!-- end -->');

      done();
    });
  });
});
