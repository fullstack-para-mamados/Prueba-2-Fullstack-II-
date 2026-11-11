module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: ['testing/tests.bundle.js'],
    preprocessors: {},
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' },
        { type: 'lcovonly', subdir: '.', file: 'lcov.info' }
      ]
    },
    browsers: ['Chrome'],
    singleRun: true,
    client: { jasmine: { random: false } },
    browserNoActivityTimeout: 60000
  });
};
