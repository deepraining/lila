import register from '@babel/register';

register({
  plugins: ['@babel/plugin-transform-modules-commonjs'],
});
