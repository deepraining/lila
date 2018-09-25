const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');
const rd = require('rd');

const demoDir = path.join(__dirname, 'demo');
const runtimeDir = path.join(__dirname, 'runtime/staticServerUrlDomain');
const distDir = path.join(runtimeDir, 'project/dist');

describe('dist staticServerUrl:domain', () => {
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

  test('dist: staticServerUrl:domain', done => {
    const child = spawn('node', [path.join(__dirname, 'dist.js')], {
      env: Object.assign({}, process.env, {
        local: 'staticServerUrl:domain',
        runtimeDir: 'runtime/staticServerUrlDomain',
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
      let cssFile;

      rd.eachFileFilterSync(distDir, file => {
        if (file.slice(-5) === '.html') htmlFile = file;
        else if (file.slice(-4) === '.css') cssFile = file;
      });

      expect(htmlFile).not.toBeUndefined();
      expect(cssFile).not.toBeUndefined();

      let htmlContent = fse.readFileSync(htmlFile, 'utf8');
      let cssContent = fse.readFileSync(cssFile, 'utf8');

      expect(/[^\w/]https:\/\/www\.baidu\.com\/avatar\.png/.test(htmlContent)).toBeTruthy();
      expect(/[^\w/]https:\/\/www\.senntyou\.com\/absolute\/path\/image\.jpg/.test(htmlContent)).toBeTruthy();
      expect(/[^\w/]https:\/\/www\.senntyou\.com\/dist\/([0-9a-f]{32})\.ico/.test(htmlContent)).toBeTruthy();
      expect(/[^\w/]https:\/\/www\.senntyou\.com\/dist\/([0-9a-f]{32})\.png/.test(htmlContent)).toBeTruthy();
      expect(/[^\w/]https:\/\/www\.senntyou\.com\/dist\/([0-9a-f]{32})\.js/.test(htmlContent)).toBeTruthy();
      expect(/[^\w/]https:\/\/www\.senntyou\.com\/dist\/([0-9a-f]{32})\.css/.test(htmlContent)).toBeTruthy();

      expect(/[^\w/]\/dist\/([0-9a-f]{32})\.png/.test(cssContent)).toBeTruthy();

      done();
    });
  });
});
