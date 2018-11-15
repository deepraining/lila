import rollup from 'rollup';

async function run(input, output) {
  /* eslint-disable no-await-in-loop */

  const bundle = await rollup.rollup(input);

  if (Array.isArray(output))
    for (let i = 0; i < output.length; i += 1) await bundle.write(output[i]);
  else await bundle.write(output);
}

export default (input, output) => run(input, output);
