'use strict';

module.exports = function(config) {
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
