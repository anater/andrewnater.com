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
        sass: {
            options: {
                sourceMap: true,
                relativeAssets: false,
                outputStyle: 'compressed',
                sassDir: '_sass',
                cssDir: '_site/css'
            },
            build: {
                files: [{
                    expand: true,
                    cwd: '_sass/',
                    src: ['**/*.{scss,sass}'],
                    dest: '_site/css',
                    ext: '.css'
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
        },
        autoprefixer: {
            options: {
              browsers: ['last 5 versions']
            },
            dist: {
                files: {
                    'css/main.css': 'css/concat.css'
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
        watch: {
            scripts: {
                files: ['css/*.css','css/*.scss','css/*.sass'],
                tasks: ['autoprefixer', 'cssmin'],
                options: {
                    spawn: false,
                },
            } 
        }
    });

    // Task Commands
    grunt.registerTask('serve', [
        'shell:jekyllServe'
    ]);

    // Register the grunt build task
    grunt.registerTask('build', [
        'shell:jekyllBuild',
        'sass'
    ]);

    // Register build as the default task fallback
    grunt.registerTask('default', 'build');
    // grunt.registerTask('default', ['cssmin', 'autoprefixer', 'watch']);

};