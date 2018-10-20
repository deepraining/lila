import rollup from 'rollup';

async function run(input, output) {
  const bundle = await rollup.rollup(input);
  await bundle.write(output);
}

export default (input, output) => run(input, output);
