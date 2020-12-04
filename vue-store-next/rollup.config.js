import typescript from '@rollup/plugin-typescript';
import { terser } from "rollup-plugin-terser";
import clear from 'rollup-plugin-clear';
import { getBabelOutputPlugin  } from '@rollup/plugin-babel';

const plugins = [
  typescript({
    tsconfig: "tsconfig.json"
  }),
  getBabelOutputPlugin({
    presets: ['@babel/preset-env'],
  }),
  terser(),
  clear({
     targets: [ './dist' ]
  })
];

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/vue-store-next-common.js',
      format: 'cjs',
      exports: 'named',
      name: 'VueStoreNext'
    },
    plugins
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/vue-store-next-esm.js',
      format: 'esm'
    },
    plugins
  },
];
