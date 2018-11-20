'use strict';

module.exports = function(config) {
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
