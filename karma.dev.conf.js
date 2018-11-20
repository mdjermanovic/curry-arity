'use strict';

module.exports = function(config) {
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
