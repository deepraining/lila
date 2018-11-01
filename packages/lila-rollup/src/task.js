import rollup from 'rollup';
import run from './run';

export default ({ entry, args, argv, cmd, config, lila }) => cb => {
  const { getSetting } = lila;
  const rollupConfigGenerator = getSetting('rollupConfigGenerator');

  if (!rollupConfigGenerator)
    throw new Error('rollupConfigGenerator not configured');

  const makeRollupConfig = rollupConfigGenerator(rollup);

  if (typeof makeRollupConfig !== 'function')
    throw new Error('rollupConfigGenerator should return a function');

  const rollupConfig = makeRollupConfig({
    entry,
    args,
    argv,
    cmd,
    config,
    lila,
  });

  run(rollupConfig, rollupConfig.output).then(() => {
    cb();
  });
};
