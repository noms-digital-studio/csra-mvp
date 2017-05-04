require('dotenv').config();

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: ['./node_modules/babel-polyfill/dist/polyfill.js', 'tests/unit/**/*.spec.js'],
    exclude: [],
    preprocessors: {
      'tests/unit/*.spec.js': ['webpack', 'sourcemap'],
      'tests/unit/**/*.spec.js': ['webpack', 'sourcemap'],
    },
    // webpack configuration
    webpack: require('./webpack.config.js'),
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only',
    },
    reporters: ['spec', 'junit'],
    junitReporter: {
      outputDir: process.env.JUNIT_REPORT_PATH,
      outputFile: process.env.JUNIT_REPORT_NAME,
      useBrowserName: false
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true,
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
    concurrency: Infinity,
  });
};
