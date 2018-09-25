const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');
const rd = require('rd');

const demoDir = path.join(__dirname, 'demo');
const runtimeDir = path.join(__dirname, 'runtime/min');
const distDir = path.join(runtimeDir, 'project/dist');

describe('dist min', () => {
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

  test('dist: min', done => {
    const child = spawn('node', [path.join(__dirname, 'dist.js')], {
      env: Object.assign({}, process.env, {
        local: 'min',
        runtimeDir: 'runtime/min',
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

      let htmlFile;
      let jsFile;
      let cssFile;

      rd.eachFileFilterSync(distDir, file => {
        if (file.slice(-5) === '.html') htmlFile = file;
        else if (file.slice(-3) === '.js') jsFile = file;
        else if (file.slice(-4) === '.css') cssFile = file;
      });

      expect(htmlFile).not.toBeUndefined();
      expect(jsFile).not.toBeUndefined();
      expect(cssFile).not.toBeUndefined();

      expect(fse.readFileSync(htmlFile, 'utf8').split('\n').length).toBeLessThan(3);
      expect(fse.readFileSync(jsFile, 'utf8').split('\n').length).toBeLessThan(3);
      expect(fse.readFileSync(cssFile, 'utf8').split('\n').length).toBeLessThan(3);

      done();
    });
  });
});
