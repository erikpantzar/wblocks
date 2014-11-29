var PATH_SRC = "src/",
    PATH_BUILD = "static/";

module.exports = function(grunt) {
    grunt.initConfig({
        PATH_SRC_JS     : PATH_SRC + 'js/',
        PATH_SRC_SASS   : PATH_SRC + 'sass/',
        PATH_SRC_IMG    : PATH_SRC + 'img/',

        PATH_BUILD_JS   : PATH_BUILD + "js/",
        PATH_BUILD_SASS : PATH_BUILD + "css/",
        PATH_BUILD_IMG  : PATH_BUILD + "img/",

        PATH_BUILD_SASS_FILENAME    : "site", // exclude .css
        PATH_BUILD_JS_FILENAME      : "global", // exclude .js

        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: [ '<%= PATH_SRC_JS %>partials/*.js'],
            options: { devel: true },
            global: { $: true }
        },

        clean: {
            cleanStyles: [ '<%= PATH_BUILD_SASS %><%= PATH_BUILD_SASS_FILENAME %>.css', 
                '<%= PATH_BUILD_SASS %><%= PATH_BUILD_SASS_FILENAME %>.css.map',
                '<%= PATH_BUILD_SASS %><%= PATH_BUILD_SASS_FILENAME %>.min.css'],
            cleanScript: [ '<%= PATH_BUILD_JS %><%= PATH_BUILD_JS_FILENAME %>.js',
                '<%= PATH_BUILD_JS %><%= PATH_BUILD_JS_FILENAME %>.min.js',
                '<%= PATH_BUILD_JS %><%= PATH_BUILD_JS_FILENAME %>.js,map',],
        },

        concat: {
            the_scripts: {
                options: {
                    sourceMap: true,
                    sourceMapStyle: 'link',
                },
                files: {
                    '<%= PATH_BUILD_JS %><%= PATH_BUILD_JS_FILENAME %>.js': [ '<%= PATH_SRC_JS %>libs/*.js', '<%= PATH_SRC_JS %>**/*.js' ],
                },
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            build: {
                src: '<%= PATH_BUILD_JS %><%= PATH_BUILD_JS_FILENAME %>.js',
                dest: '<%= PATH_BUILD_JS %><%= PATH_BUILD_JS_FILENAME %>.min.js'
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '<%= PATH_SRC_IMG %>',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= PATH_BUILD_IMG %>'
                }]
            }
        },

        sass: {
            options: { sourceMap: '<%= PATH_BUILD_SASS_FILENAME %>.css.map' },
            compile: { 
                files: { '<%= PATH_BUILD_SASS %><%= PATH_BUILD_SASS_FILENAME %>.css': '<%= PATH_SRC_SASS %>*.scss' },
            },
        },  

        cssmin: {
            add_banner: {
                options: {
                   banner: '/* Celebration Studios Presents: <%= pkg.name %> <%= pkg.version %> */',
                   keepSpecialComments: 2,
                },
                files: {
                    '<%= PATH_BUILD_SASS %><%= PATH_BUILD_SASS_FILENAME %>.min.css': ['<%= PATH_BUILD_SASS %>*.css', '!<%= PATH_BUILD_SASS %>*.min.css' ],
                }
            }
        },


        compass: {
            options: {
                outputStyle: 'expanded',
                sassDir: '<%= PATH_SRC_SASS %>',
                cssDir: '<%= PATH_BUILD_SASS %>',
                specify: '<%= PATH_SRC_SASS %>*.{scss,sass}',
            },
        },

        autoprefixer: {
            options: {
                diff: true,
                map: true,
            },
            multiple_files: {
                src: '<%= PATH_BUILD_SASS %>*.css',
            },
        },

        watch: {
            options: {
                livereload: true,
            },

            images: {
                files: [ '<%= PATH_SRC_IMG %>**/*.{png, jpg, gif}'],
                tasks: ['imagemin'],
            },

            styles: {
                files: ['<%= PATH_SRC_SASS %>**/*.scss'],
                tasks: ['sass', 'autoprefixer','cssmin'],
            },

            scripts: {
                files: [ '<%= PATH_SRC_JS %>**/*.js'],
                tasks: ['jshint', 'concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.registerTask('default', [
        'clean',
        'sass','autoprefixer','cssmin',
        'jshint','concat','uglify',
        'watch'
        ]);

    grunt.registerTask('live', [
        'clean',
        'jshint','concat','uglify',
        'sass','autoprefixer','cssmin',
        'imagemin',
        ]);

};
