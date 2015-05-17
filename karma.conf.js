module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/assets/components/angular/angular.js',
      'app/assets/components/angular-route/angular-route.js',
      'app/assets/components/angular-mocks/angular-mocks.js',
      'app/components/**/*.js',
      'app/shared/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};
