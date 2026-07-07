import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json';

const dev = process.env.ROLLUP_WATCH;

const serveopts = {
  contentBase: ['./dist'],
  host: '0.0.0.0',
  port: 5000,
  allowCrossOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

const plugins = [
  nodeResolve({}),
  commonjs(),
  typescript({ tsconfig: './other/ops/tsconfig.build.json', noEmit: false, outputToFilesystem: false }),
  json(),
  dev && serve(serveopts),
  !dev && terser(),
];

export default [
  {
    input: 'src/cards/my-slider.ts',
    output: {
      file: 'dist/my-slider-v2.js',
      format: 'es',
    },
    plugins: [...plugins],
  },
];
