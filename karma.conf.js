module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine-jquery', 'jasmine', 'karma-typescript'],
    files: [
      'node_modules/jquery/dist/jquery.js',
      'src/plugin/**/*.ts',
      'src/test/**/*Spec.ts'
    ],
    exclude: [
    ],
    preprocessors: {
      'src/plugin/**/*.ts': ['karma-typescript', 'sourcemap', 'coverage'],
      'src/test/**/*.ts': ['karma-typescript',  'sourcemap'],
      'karma.conf.js': ['karma-typescript',  'sourcemap']
    },
    reporters: ['progress', 'coverage', 'karma-typescript'],
    coverageReporter: {
      dir:'tmp/coverage/',
      reporters: [
        { type:'html', subdir: 'report-html' },
        { type:'lcov', subdir: 'report-lcov' }
      ],
      instrumenterOptions: {
        istanbul: { noCompact: true }
      }
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
  })
};
