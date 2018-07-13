const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');

const filesCount = require('../../util/files_count');

const script = path.join(__dirname, 'demo.js');
const demoDir = path.join(__dirname, 'demo');

describe('new command', () => {
  beforeAll(() => {
    if (fs.existsSync(demoDir)) {
      fse.removeSync(demoDir);
    }
  });

  afterAll(() => {
    if (fs.existsSync(demoDir)) {
      fse.removeSync(demoDir);
    }
  });

  test('create project without name', done => {
    const child = spawn('node', [path.join(__dirname, 'no-name.js')]);

    let stderrCount = 0;
    let stderrMessage;

    child.stderr.on('data', data => {
      stderrCount += 1;
      stderrMessage = data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(1);
      // Have one stderr
      expect(stderrCount).toBe(1);
      // Have stderr
      expect(stderrMessage).not.toBeUndefined();
      // Have stderr
      expect(stderrMessage).toContain('Missing project name for command: new.');
      done();
    });
  });

  test('create project by name [demo]', done => {
    const child = spawn('node', [script]);

    let stdoutCount = 0;
    let stdoutMessage;

    child.stdout.on('data', data => {
      stdoutCount += 1;
      stdoutMessage = data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      // Have one stdout
      expect(stdoutCount).toBe(1);
      // Have stdout
      expect(stdoutMessage).not.toBeUndefined();
      // Have stdout
      expect(stdoutMessage).toContain('successfully!');
      // Have demo string in package.json
      expect(fse.readFileSync(path.join(demoDir, 'package.json'), 'utf8')).toContain('demo');
      // Have demo string in README.md
      expect(fse.readFileSync(path.join(demoDir, 'README.md'), 'utf8')).toContain('demo');
      // 14 files, include .gitkeep
      expect(filesCount(demoDir)).toBe(14);
      done();
    });
  });

  test('create project by name [demo] second times', done => {
    const child = spawn('node', [script]);

    let stderrCount = 0;
    let stderrMessage;

    child.stderr.on('data', data => {
      stderrCount += 1;
      stderrMessage = data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(1);
      // Have one stderr
      expect(stderrCount).toBe(1);
      // Have stderr
      expect(stderrMessage).not.toBeUndefined();
      // Have stderr
      expect(stderrMessage).toContain('has already been created.');
      done();
    });
  });
});
