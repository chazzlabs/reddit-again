module.exports = function (config) {
    config.set({
        frameworks: ['browserify', 'jasmine'],
        files: [
            'src/**/*.js',
            'test/**/*.test.js'
        ],
        preprocessors: {
            'src/**/*.js': 'browserify',
            'test/**/*.test.js': 'browserify'
        },
        browserify : {
            debug: true,
            transform : ['babelify']
        },

        // Cannot use PhantomJS currently
        browsers: [ 'Chrome' ],
        
        singleRun: true,
        reporters: [ 'dots' ]
    });
};
