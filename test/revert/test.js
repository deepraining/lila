const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');

const filesCount = require('../../util/files_count');

const script1 = path.join(__dirname, '1.js');
const script2 = path.join(__dirname, '2.js');
const script3 = path.join(__dirname, '3.js');
const distDir = path.join(__dirname, 'demo/dist');

describe('revert command', () => {
  // 60s timeout
  jest.setTimeout(60000);

  beforeAll(() => {
    if (fs.existsSync(distDir)) {
      fse.removeSync(distDir);
    }
  });

  afterAll(() => {
    if (fs.existsSync(distDir)) {
      fse.removeSync(distDir);
    }
  });

  test('revert by no zip files', done => {
    const child = spawn('node', [path.join(__dirname, 'not-exist.js')]);

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
      expect(stderrMessage).toContain('No archive packages in current directory.');
      done();
    });
  });

  test('revert index:1', done => {
    const child = spawn('node', [script1]);

    // Last message
    let stdoutMessage;

    child.stdout.on('data', data => {
      stdoutMessage = data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      // Has stdout
      expect(stdoutMessage).not.toBeUndefined();
      // Has stdout
      expect(stdoutMessage).toContain("Revert 'dist' directory to last");
      // 2 files
      expect(filesCount(distDir)).toBe(2);
      // Has 1.js
      expect(fs.existsSync(path.join(distDir, '11.js'))).toBeTruthy();
      // Has inner/2.js
      expect(fs.existsSync(path.join(distDir, 'inner/12.js'))).toBeTruthy();
      done();
    });
  });

  test('revert index:2', done => {
    const child = spawn('node', [script2]);

    // Last message
    let stdoutMessage;

    child.stdout.on('data', data => {
      stdoutMessage = data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      // Has stdout
      expect(stdoutMessage).not.toBeUndefined();
      // Has stdout
      expect(stdoutMessage).toContain("Revert 'dist' directory to last");
      // 2 files
      expect(filesCount(distDir)).toBe(2);
      // Has 1.js
      expect(fs.existsSync(path.join(distDir, '1.js'))).toBeTruthy();
      // Has inner/2.js
      expect(fs.existsSync(path.join(distDir, 'inner/2.js'))).toBeTruthy();
      done();
    });
  });

  test('revert index:3', done => {
    const child = spawn('node', [script3]);

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
      expect(stderrMessage).toContain("is greater than packages' length");
      done();
    });
  });
});
