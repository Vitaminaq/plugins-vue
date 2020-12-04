import typescript from '@rollup/plugin-typescript';
import { terser } from "rollup-plugin-terser";
import clear from 'rollup-plugin-clear';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import createTypes from './script/create-type';

const plugins = [
  typescript({
    tsconfig: "tsconfig.json",
    lib: ["es5", "es6", "dom"],
    target: "es5"
  }),
  getBabelOutputPlugin({
    presets: ['@babel/preset-env'],
  }),
  terser(),
  clear({
     targets: [ './dist' ]
  }),
  createTypes(),
];

export default [{
  input: 'src/index.ts',
  external: ['vue'],
  output: {
    file: 'dist/vue-store-next-common.js',
    format: 'cjs',
    exports: 'named',
    name: 'VueStoreNext'
  },
  plugins
}, {
  input: 'src/index.ts',
  external: ['vue'],
  output: {
    file: 'dist/vue-store-next-esm.js',
    format: 'esm'
  },
  plugins,
}];