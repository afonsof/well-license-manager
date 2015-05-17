module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            dist: {
                options: {
                    paths: ["assets/css"]
                },
                files: {
                    "app/assets/css/app.css": "app/assets/css/app.less"
                }
            }
        }
    });

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Default task(s).
    grunt.registerTask('default', ['less']);
};
