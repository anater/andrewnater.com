module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        shell: {
            jekyllBuild: {
                command: 'jekyll build'
            },
            jekyllServe: {
                command: 'jekyll serve'
            }
        },
        watch: {
            scripts: {
                files: ['_sass/*.scss'],
                tasks: ['sass','autoprefixer', 'cssmin']
            } 
        },
        sass: {
            options: {
                sourceMap: true,
                relativeAssets: false,
                outputStyle: 'expand',
                sassDir: '_sass',
                cssDir: 'css'
            },
            build: {
                files: [{
                    expand: true,
                    cwd: '_sass/',
                    src: ['**/*.{scss,sass}'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },
        autoprefixer: {
            options: {
              browsers: ['last 5 versions']
            },
            dist: {
                files: {
                    'css/main.css': 'css/main.css'
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: 'main.css',
                    dest: 'css',
                    ext: '.min.css'
                }]
            }
        },
        concurrent: {
            serve: [
                'sass',
                'watch',
                'shell:jekyllServe'
            ],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    // Task Commands
    grunt.registerTask('serve', [
        'concurrent:serve'
    ]);

    // Register the grunt build task
    grunt.registerTask('build', [
        'shell:jekyllBuild',
        'sass',
        'autoprefixer',
        'cssmin'
    ]);

    // Register build as the default task fallback
    grunt.registerTask('default', 'build');

};