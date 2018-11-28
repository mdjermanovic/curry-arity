'use strict';

let karmaConfig;

switch (process.env.TEST_RUN) {
  case 'bundle':
    karmaConfig = function(config) {
      config.set({
        frameworks: ['mocha', 'chai'],
        files: ['dev/bundle.js'],
        preprocessors: {},
        reporters: ['mocha', 'coverage'],
        port: 9875,
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ['ChromeHeadless'],
        autoWatch: false,
        concurrency: Infinity,
        coverageReporter: {
          dir: '.',
          reporters: [{ type: 'lcov', subdir: 'coverage' }, { type: 'text' }],
        },
      });
    };
    break;
  case 'iife':
    karmaConfig = function(config) {
      config.set({
        frameworks: ['mocha', 'chai'],
        files: ['karma.require.js', 'dist/curryarity.min.js', 'test/*.js'],
        preprocessors: {
          'test/*.js': ['babel'],
        },
        reporters: ['mocha'],
        port: 9874,
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ['ChromeHeadless'],
        autoWatch: false,
        concurrency: Infinity,
      });
    };
    break;
  case 'dev':
    karmaConfig = function(config) {
      config.set({
        frameworks: ['mocha', 'chai'],
        files: ['dev/dev.js'],
        preprocessors: {},
        reporters: ['mocha'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ['Chrome'],
        autoWatch: false,
        concurrency: Infinity,
      });
    };
    break;
}

module.exports = karmaConfig;
