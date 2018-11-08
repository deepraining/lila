let lila;

describe('no lila.js', () => {
  beforeAll(() => {
    if (process.argv.slice(-2)[0] === '--root')
      process.argv = process.argv.slice(0, -2);

    lila = require('../../lila-core/lib'); // eslint-disable-line
  });

  test('get setting or settings', () => {
    const { getSetting, getSettings, getAllSettings } = lila;

    // single
    expect(getSetting('src')).toBe('src');
    expect(getSetting('dev')).toBe('dev');

    // multiple
    const multi = getSettings(['build', 'tmp', 'root']);
    expect(multi.length).toBe(3);
    expect(multi[0]).toBe('build');
    expect(multi[1]).toBe('.lila');

    // all
    const all = getAllSettings();
    const keys = Object.keys(all);
    expect(keys.length).toBe(5);
  });

  test('set setting or settings', () => {
    const { getSetting, getAllSettings, setSetting, setSettings } = lila;

    // new
    setSetting('hello', 'hi');
    expect(getSetting('hello')).toBe('hi');
    expect(Object.keys(getAllSettings()).length).toBe(6);

    // multiple
    const root = getSetting('root');
    setSettings({ src: 'newSrc', root: 'newRoot' });
    expect(getSetting('src')).toBe('newSrc');
    expect(getSetting('root')).toBe(root);

    // single
    setSetting('src', 'src');
    setSetting('root', 'newRoot');
    expect(getSetting('src')).toBe('src');
    expect(getSetting('root')).toBe(root);
  });

  test('register or unregister task', () => {
    const {
      registerTask,
      unregisterTask,
      getTask,
      getTasks,
      getAllTasks,
    } = lila;

    expect(Object.keys(getAllTasks()).length).toBe(0);
    expect(getTask('hello')).toBeUndefined();

    // register
    registerTask('hello', () => cb => {
      cb();
    });
    registerTask('hi', () => cb => {
      cb();
    });

    expect(typeof getTask('hello')).toBe('function');
    expect(typeof getTask('hi')).toBe('function');
    expect(Object.keys(getAllTasks()).length).toBe(2);
    const tasks = getTasks(['hello', 'hi', 'hey']);
    expect(typeof tasks[0]).toBe('function');
    expect(typeof tasks[1]).toBe('function');
    expect(typeof tasks[2]).toBe('undefined');

    // unregisterTask
    unregisterTask('hello');
    expect(typeof getTask('hello')).toBe('undefined');
    expect(typeof getTask('hi')).toBe('function');
    expect(Object.keys(getAllTasks()).length).toBe(1);
  });

  test('add command', () => {
    const { addCommand, getCommands } = lila;

    expect(Object.keys(getCommands()).length).toBe(2);

    addCommand(() => {});
    expect(Object.keys(getCommands()).length).toBe(3);
  });

  test('makeConfig', () => {
    const { makeConfig } = lila;

    expect(typeof makeConfig()).toBe('object');
    expect(Object.keys(makeConfig()).length).toBe(0);
  });
});
