const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');

const filesCount = require('../../util/files_count');

const script1 = path.join(__dirname, '1.js');
const script2 = path.join(__dirname, '2.js');
const script3 = path.join(__dirname, '3.js');
const dir1 = path.join(__dirname, 'demo/project/src/index');
const dir2 = path.join(__dirname, 'demo/project/src/test/index');
const dir2_2 = path.join(__dirname, 'demo/project/src/test');
const dir3 = path.join(__dirname, 'demo/project/src/parent/test/index');
const dir3_2 = path.join(__dirname, 'demo/project/src/parent');

describe('add command', () => {
  // 60s timeout
  jest.setTimeout(60000);

  beforeAll(() => {
    if (fs.existsSync(dir1)) {
      fse.removeSync(dir1);
    }
    if (fs.existsSync(dir2_2)) {
      fse.removeSync(dir2_2);
    }
    if (fs.existsSync(dir3_2)) {
      fse.removeSync(dir3_2);
    }
  });

  afterAll(() => {
    if (fs.existsSync(dir1)) {
      fse.removeSync(dir1);
    }
    if (fs.existsSync(dir2_2)) {
      fse.removeSync(dir2_2);
    }
    if (fs.existsSync(dir3_2)) {
      fse.removeSync(dir3_2);
    }
  });

  test('add module without name', done => {
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
      expect(stderrMessage).toContain('Missing module name for command: add.');
      done();
    });
  });

  test('add module by name [index]', done => {
    const child = spawn('node', [script1]);

    let stdoutCount = 0;
    let stdoutMessage;

    child.stdout.on('data', data => {
      stdoutCount += 1;
      stdoutMessage = data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      // Has one stdout
      expect(stdoutCount).toBe(1);
      // Has stdout
      expect(stdoutMessage).not.toBeUndefined();
      // Has stdout
      expect(stdoutMessage).toContain('successfully!');
      // Has index.html
      expect(fs.existsSync(path.join(dir1, 'index.html'))).toBeTruthy();
      // Has index.js
      expect(fs.existsSync(path.join(dir1, 'index.js'))).toBeTruthy();
      // 2 files, index.html,index.js
      expect(filesCount(dir1)).toBe(2);
      done();
    });
  });

  test('add module by name [index] second times', done => {
    const child = spawn('node', [script1]);

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
      expect(stderrMessage).toContain('has already been added.');
      done();
    });
  });

  test('add module by name [test/index]', done => {
    const child = spawn('node', [script2]);

    let stdoutCount = 0;
    let stdoutMessage;

    child.stdout.on('data', data => {
      stdoutCount += 1;
      stdoutMessage = data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      // Has one stdout
      expect(stdoutCount).toBe(1);
      // Has stdout
      expect(stdoutMessage).not.toBeUndefined();
      // Has stdout
      expect(stdoutMessage).toContain('successfully!');
      // Has index.html
      expect(fs.existsSync(path.join(dir2, 'index.html'))).toBeTruthy();
      // Has index.js
      expect(fs.existsSync(path.join(dir2, 'index.js'))).toBeTruthy();
      // 2 files, index.html,index.js
      expect(filesCount(dir2)).toBe(2);
      done();
    });
  });

  test('add module by name [parent/test/index]', done => {
    const child = spawn('node', [script3]);

    let stdoutCount = 0;
    let stdoutMessage;

    child.stdout.on('data', data => {
      stdoutCount += 1;
      stdoutMessage = data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      // Has one stdout
      expect(stdoutCount).toBe(1);
      // Has stdout
      expect(stdoutMessage).not.toBeUndefined();
      // Has stdout
      expect(stdoutMessage).toContain('successfully!');
      // Has index.html
      expect(fs.existsSync(path.join(dir3, 'index.html'))).toBeTruthy();
      // Has index.js
      expect(fs.existsSync(path.join(dir3, 'index.js'))).toBeTruthy();
      // 2 files, index.html,index.js
      expect(filesCount(dir3)).toBe(2);
      done();
    });
  });
});
