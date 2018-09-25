const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');

const filesCount = require('../../util/files_count');

const demoDir = path.join(__dirname, 'demo');
const runtimeDir = path.join(__dirname, 'runtime/base');
const dotLilaDir = path.join(runtimeDir, '.lila');
const manifestsDir = path.join(runtimeDir, '.lila/manifests');
const distDir = path.join(runtimeDir, 'project/dist');

describe('dist base', () => {
  // 60s timeout
  jest.setTimeout(60000);

  beforeAll(() => {
    fse.copySync(demoDir, runtimeDir);
  });
  afterAll(() => {
    if (fs.existsSync(runtimeDir)) {
      fse.removeSync(runtimeDir);
    }
  });

  beforeEach(() => {
    if (fs.existsSync(dotLilaDir)) {
      fse.removeSync(dotLilaDir);
    }
    if (fs.existsSync(distDir)) {
      fse.removeSync(distDir);
    }
  });
  afterEach(() => {
    if (fs.existsSync(dotLilaDir)) {
      fse.removeSync(dotLilaDir);
    }
    if (fs.existsSync(distDir)) {
      fse.removeSync(distDir);
    }
  });

  test('dist: no lila.config.js file', done => {
    const child = spawn('node', [path.join(__dirname, 'no-lila-config.js')]);

    let stderrCount = 0;
    let stderrMessage;

    child.stderr.on('data', data => {
      stderrCount += 1;
      stderrMessage = data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(1);
      // Has one stderr
      expect(stderrCount).toBe(1);
      // Has stderr
      expect(stderrMessage).not.toBeUndefined();
      // Has stderr
      expect(stderrMessage).toContain('Missing config file');
      done();
    });
  });

  test('dist: no module name', done => {
    const child = spawn('node', [path.join(__dirname, 'no-name.js')]);

    let stderrCount = 0;
    let stderrMessage;

    child.stderr.on('data', data => {
      stderrCount += 1;
      stderrMessage = data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(1);
      // Has one stderr
      expect(stderrCount).toBe(1);
      // Has stderr
      expect(stderrMessage).not.toBeUndefined();
      // Has stderr
      expect(stderrMessage).toContain('Missing module name for command: dist.');
      done();
    });
  });

  test('dist: no match', done => {
    const child = spawn('node', [path.join(__dirname, 'no-match.js')]);

    let stderrCount = 0;
    let stderrMessage;

    child.stderr.on('data', data => {
      stderrCount += 1;
      stderrMessage = data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(1);
      // Has one stderr
      expect(stderrCount).toBe(1);
      // Has stderr
      expect(stderrMessage).not.toBeUndefined();
      // Has stderr
      expect(stderrMessage).toContain('No modules found');
      done();
    });
  });

  test('dist: default config', done => {
    const child = spawn('node', [path.join(__dirname, 'dist.js')]);

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
      // 4 files: png, ico, js, html
      expect(filesCount(distDir)).toBe(4);
      // Check html.
      expect(fs.existsSync(path.join(distDir, 'html/test/index.html'))).toBeTruthy();
      // Check manifests directory.
      expect(fs.existsSync(manifestsDir)).toBeTruthy();
      done();
    });
  });
});
