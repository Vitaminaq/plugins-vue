import typescript from '@rollup/plugin-typescript';
import { terser } from "rollup-plugin-terser";
import clear from 'rollup-plugin-clear';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import buble from '@rollup/plugin-buble';

const map = {
  'cjs': 'common',
  'esm': 'esm',
  'umd': 'min'
}

const build = (format) => {
  const plugins = [
    typescript({
      tsconfig: "tsconfig.json",
      lib: ["es5", "es6", "dom"],
      target: "es5"
    }),
    format === 'umd' ? buble() : getBabelOutputPlugin({
        presets: ['@babel/preset-env'],
    }),
    terser(),
    clear({
      targets: [ './dist' ]
    })
  ];
  const output = {
    file: `dist/vue-image-lazy-load-${map[format]}.js`,
    format
  }
  if (format !== 'esm') {
    output.exports = 'named';
    output.name = 'VueImageLazyLoad';
  }
  const options = {
    input: 'src/index.ts',
    external: ['vue'],
    plugins,
    output
  }
  return options;
}

export default [
  build('cjs'),
  build('esm'),
  build('umd')
];
