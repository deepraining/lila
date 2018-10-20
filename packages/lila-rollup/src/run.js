import rollup from 'rollup';

async function run(input, output) {
  const bundle = await rollup.rollup(input);

  if (Array.isArray(output))
    for (let i = 0; i < output.length; i += 1)
      // todo no-await-in-loop
      await bundle.write(output[i]);
  // eslint-disable-line no-await-in-loop
  else await bundle.write(output);
}

export default (input, output) => run(input, output);
