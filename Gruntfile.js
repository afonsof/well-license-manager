'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var config = {
        app: require('./bower.json').appPath || 'app',
        dist: 'dist',
        tmp: '.tmp'
    };

    grunt.initConfig({

        appConfig: config,

        watch: {
            js: {
                files: ['<%= appConfig.app %>/**/{,*/}*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            styles: {
                files: ['<%= appConfig.app %>/assets/css/{,*/}*.less'],
                tasks: ['less']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= appConfig.app %>/{,*/}*.html',
                    '.tmp/assets/css/{,*/}*.css',
                    '<%= appConfig.app %>/assets/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./app/bower_components')
                            ),
                            connect.static(config.dist)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= appConfig.dist %>'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= appConfig.app %>/components/**/{,*/}*.js',
                    '<%= appConfig.app %>/shared/**/{,*/}*.js'
                ]
            }
        },

        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= appConfig.dist %>/{,*/}*',
                            '!<%= appConfig.dist %>/.git*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },

        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= appConfig.tmp %>/concat/assets/css/',
                        src: '{,*/}*.css',
                        dest: '<%= appConfig.tmp %>/concat/assets/css/'
                    }
                ]
            }
        },

        filerev: {
            dist: {
                src: [
                    '<%= appConfig.dist %>/{,*/}*.js',
                    '<%= appConfig.dist %>/assets/css/{,*/}*.css',
                    '<%= appConfig.dist %>/assets/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= appConfig.dist %>/fonts/*'
                ]
            }
        },

        useminPrepare: {
            html: '<%= appConfig.app %>/index.html',
            options: {
                dest: '<%= appConfig.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['concat', 'cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        cssmin: {
            dist: {
                files: {
                    '<%= appConfig.dist %>/assets/css/app.css': [
                        '.tmp/assets/css/{,*/}*.css'
                    ]
                }
            }
        },

        usemin: {
            html: ['<%= appConfig.dist %>/**/*.html'],
            css: ['<%= appConfig.dist %>/assets/css/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= appConfig.dist %>', '<%= appConfig.dist %>/assets/img']
            }
        },

        less: {
            dist: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    '<%= appConfig.app %>/assets/css/app.css': '<%= appConfig.app %>/assets/css/app.less'
                }
            }
        },

        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= appConfig.app %>/assets/img',
                        src: '{,*/}*.{png,jpg,jpeg,gif}',
                        dest: '<%= appConfig.dist %>/assets/img'
                    }
                ]
            }
        },

        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= appConfig.app %>/assets/img',
                        src: '{,*/}*.svg',
                        dest: '<%= appConfig.dist %>/assets/img'
                    }
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= appConfig.dist %>',
                        src: ['**/*.html'],
                        dest: '<%= appConfig.dist %>'
                    }
                ]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= appConfig.app %>',
                        dest: '<%= appConfig.dist %>',
                        src: [
                            '*.{html,ico,png,txt}',
                            'components/**/*.html',
                            'shared/**/*.html',
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= appConfig.app %>/assets/components/materialize',
                        src: 'font/**/*.woff*',
                        dest: '<%= appConfig.dist %>/assets'
                    }/*,
                     {
                     expand: true,
                     cwd: 'src/3rd/material-design-iconic-font',
                     src: 'fonts/*.woff',
                     dest: '<%= appConfig.dist %>'
                     }*/
                ]
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            shrinkImages: [
                'imagemin',
                'svgmin'
            ]
        }
    });

    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist', //erase all dist folder files,
        'less',
        'useminPrepare', //gera as instruções de minificação
        'concurrent:shrinkImages', // minimiza imagens
        'concat', // junta os arquivos em um só
        'autoprefixer', //pensar em rodar depois do concat
        'copy:dist',
        'cssmin',
        'uglify',
        //'filerev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'build'
    ]);
};