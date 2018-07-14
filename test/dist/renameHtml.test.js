const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');

const demoDir = path.join(__dirname, 'demo');
const fixtureDir = path.join(__dirname, 'fixtures/renameHtml');
const distDir = path.join(fixtureDir, 'project/dist');

describe('dist renameHtml', () => {
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

  test('dist: renameHtml[test/index -> test-2/index]', done => {
    const child = spawn('node', [path.join(__dirname, 'dist.js')], {
      env: Object.assign({}, process.env, {
        local: 'renameHtml',
        fixtureDir: 'fixtures/renameHtml',
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

      expect(fs.existsSync(path.join(distDir, 'html/test/index.html'))).toBeFalsy();
      expect(fs.existsSync(path.join(distDir, 'html/test-2/index.html'))).toBeTruthy();

      done();
    });
  });
});
