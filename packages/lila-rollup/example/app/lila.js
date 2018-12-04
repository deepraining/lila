import rollupPlugin from '../../lib';

export default lila => {
  const { setSetting } = lila;

  setSetting('rollupConfigGenerator', () => options => {
    const { cmd } = options;

    // console.log('rollupConfigGenerator/rollup', rollup);
    // console.log('rollupConfigGenerator/entry', options.entry);
    // console.log('rollupConfigGenerator/args', options.args);
    // console.log('rollupConfigGenerator/argv', options.argv);
    // console.log('rollupConfigGenerator/cmd', options.cmd);
    // console.log('rollupConfigGenerator/config', options.config);
    // console.log('rollupConfigGenerator/lila', options.lila);

    const isDev = cmd === 'start';
    const dir = isDev ? 'dev' : 'lib';

    return {
      input: `${__dirname}/src/index.js`,
      output: {
        file: `${__dirname}/${dir}/index.js`,
        format: 'cjs',
        sourcemap: !0,
      },
    };
  });

  setSetting('getEntries', () =>
    // console.log(`getEntries/dir: ${dir}`);

    ['test']
  );

  rollupPlugin(lila);

  return () => ({
    watch: ['src', 'dev'],
    tasks: ['@lila/rollup'],
  });
};
