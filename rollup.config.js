'use strict';

const resolve = require('rollup-plugin-node-resolve');
const istanbul = require('rollup-plugin-istanbul');
const multiEntry = require('rollup-plugin-multi-entry');

module.exports = [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/curryarity.cjs.js',
        format: 'cjs',
      },
      {
        file: 'dist/curryarity.js',
        format: 'iife',
        name: 'CurryArity',
      },
    ],
  },
  {
    input: 'test/*.js',
    output: [
      {
        file: 'dev/bundle.js',
        format: 'iife',
        name: 'bundle',
        globals: {
          chai: 'chai',
        },
      },
    ],
    plugins: [
      resolve({
        // to resolve src/index.js instead of dist/curryarity.cjs.js
        module: true,
      }),
      multiEntry(),
      istanbul({
        exclude: ['test/*.js'],
      }),
    ],
    // will use karma-chai
    external: ['chai'],
  },
  {
    input: 'test/*.js',
    output: [
      {
        file: 'dev/dev.js',
        format: 'iife',
        name: 'dev',
        globals: {
          chai: 'chai',
        },
        sourcemap: 'inline',
      },
    ],
    plugins: [
      resolve({
        module: true,
      }),
      multiEntry(),
    ],
    external: ['chai'],
  },
];
