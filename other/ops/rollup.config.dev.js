import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json';

export default {
  input: ['src/my-cards.ts'],
  output: {
    dir: './dist/dev',
    format: 'es',
  },
  plugins: [
    nodeResolve({}),
    commonjs(),
    typescript({ tsconfig: './other/ops/tsconfig.build.json', noEmit: false, outputToFilesystem: false }),
    json(),
    terser(),
    serve({
      contentBase: './dist/dev',
      host: '0.0.0.0',
      port: 5000,
      allowCrossOrigin: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }),
  ],
};
