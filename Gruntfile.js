/******************************************************************
 * Burrito
 * Grunt Setup
 ******************************************************************/

module.exports = function(grunt) {
    
    /**************************************************************
     * Config
     *************************************************************/

    /**
     * Set the default theme to compile assets for
     * @var {string} theme
     */
    var theme = grunt.option('theme') || 'Burrito';
    
    /**
     * Set your desired development environment
     * @var {('dev'|'prod')} [dev] env
     */
    var env = grunt.option('env') || 'dev';

    /**
     * Set the path to the compiled global scripts directory
     * @var {string} scripts_dist
     */
    var scripts_dist = 'dist/scripts/';

    /**
     * Set the path to the compiled global styles directory
     * @var {string} styles_dist
     */
    var styles_dist  = 'dist/styles/';

    /**
     * Set the path to the images directory
     * @var {string} styles_dist
     */
    var images_dist  = 'dist/images/';

    /**
     * Set the path to the compiled theme assets
     * @var {string} theme_dist
     */
    var theme_dist  = 'dist/' + theme + '/';

    /**
     * Set the scripts to be included in your theme's main js file
     * @var {object} _scripts
     */
    var _scripts = [
        'assets/js/**/*.js',
        'assets/themes/<%= theme %>/<%= theme %>.js'
    ];

    /**
     * Set all global scripts to be used by the project
     * @var {object} _globalScripts
     */
    var _globalScripts = [
        'assets/vendor/jQuery/dist/jquery.js'
    ];

    /**
     * Set all global styles to be used by the project
     * @var {object} _globalStyles
     */
    var _globalStyles = [];
    
    /**************************************************************
     * Packages
     *************************************************************/
        
    grunt.initConfig({
		
        pkg: grunt.file.readJSON('package.json'),

        theme: theme,
        theme_dist: theme_dist,
        
        /**
         * Clean
         * @see https://github.com/gruntjs/grunt-contrib-clean
         */
        clean: {
            app: [
                'dist/*', 
                '!dist/images/**'
            ],
            scripts: [
                'dist/scripts/**/*.js', 
                '!dist/**/*.min.js'
            ],
            styles: [
                'dist/**/*.css', 
                '!dist/**/*.min.css'
            ],
            images: {
                src: 'dist/images'
            }
        },

        /**
         * Concat
         * @see https://github.com/gruntjs/grunt-contrib-concat
         */
        concat: {
            app: {
                src: _scripts,
                dest: theme_dist + 'app.js',
            }
        },
        
        /**
         * Copy
         * @see https://github.com/gruntjs/grunt-contrib-copy
         */
        copy: {
            styles: {
                files: [{
                    src: [_globalStyles],
                    dest: styles_dist,
                    expand: true,
                    flatten: true
                }]
            },
            scripts: {
                files: [{
                    src: [_globalScripts],
                    dest: scripts_dist,
                    expand: true,
                    flatten: true
                }]
            },
            images: {
                files: [{
                    cwd: 'assets/images',
                    src: '**/*',
                    dest: images_dist,
                    expand: true
                }]
            }
        },

        /**
         * Sass
         * @see https://github.com/sindresorhus/grunt-sass
         */
        sass: {
            dev: {
                options: {
                    outputStyle: 'expanded'
                },
                files: {
                    '<%= theme_dist %>app.css': 'assets/app.scss'
                }
            },
            prod: {
                options: {
                    outputStyle: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    '<%= theme_dist %>app.min.css': 'assets/app.scss'
                }
            }
        },

        /**
         * PostCSS
         * @see https://github.com/nDmitry/grunt-postcss
         */
        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer') ({
                        browsers: [
                            'last 2 versions', 
                            'ie >= 9'
                        ]
                    })
                ]
            },
            build: {
                src: theme_dist + '*.css'
            }
        },

        /**
         * Uglify
         * @see https://github.com/gruntjs/grunt-contrib-uglify
         */
        uglify: {
            options: {
                compress: {
                    drop_console: true
                }
            },
            app: {
                files: [{ 
                    src: 'dist/scripts/*.js',
                    dest: scripts_dist,
                    expand: true,
                    flatten: true,
                    rename: function(dest, src) { 
                        return dest + '/' + src.replace('.js', '.min.js'); 
                    }
                }]
            }
        },

        /**
         * Scss Lint
         * @see https://github.com/ahmednuaman/grunt-scss-lint
         */
        scsslint: {
            allFiles: [
                'assets/scss/**/*.scss'
            ],
            options: {
                config: '.scss-lint.yml',
                colorizeOutput: false
            },
        },

        /**
         * JSHint
         * @see https://github.com/gruntjs/grunt-contrib-jshint
         */
        jshint: {
            app: [
                'Gruntfile.js', 
                'assets/js/**/*.js',
                'assets/themes/**/*.js'
            ]
        },

        /**
         * Watch
         * @see https://github.com/gruntjs/grunt-contrib-watch
         */
        watch: {
            options: {
                spawn: false,
            },
            scss: {
                files: [
                    'assets/scss/**/*.scss'
                ],
                tasks: [ 
                    'sass:' + env, 
                    'postcss',
                    //'scsslint',
                    'sassdoc',
                    'notify:css'
                ],
            },
            scripts: {
                files: _scripts,
                tasks: [
                    'concat',
                    'jshint',
                    'notify:scripts'
                ]
            },
            images: {
                files: 'assets/images/**/*',
                tasks: [
                    'clean:images',
                    'copy:images'
                ]
            },
            templates: {
                files: 'templates/**/*',
                tasks: [
                    'notify:templates'
                ]
            }
        },

        /**
         * Notify
         * @see https://github.com/dylang/grunt-notify
         */
        notify: {
            scripts: {
                options: {
                    title: 'Scripts Compiled',
                    message: 'All scripts have been successfully compiled!'
                }
            },
            css: {
                options: {
                    title: 'Styles Compiled',
                    message: 'All styles have been successfully compiled!'
                }
            },
            templates: {
                options: {
                    title: 'Templates Compiled',
                    message: 'All templates have been successfully compiled!'
                }
            },
            app: {
                options: {
                    title: 'App Built',
                    message: 'Your app has been successfully built!'
                }
            }
        }
    });
    
    /**************************************************************
     * Load NPM Tasks
     *************************************************************/
    
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-scss-lint');
    
    /**************************************************************
     * Tasks
     *************************************************************/
    
    /**
     * Compile Assets
     * @param {(env|prod)} environment
     */
    var gruntCompile = function(environment) {
        var assetTasks = [
            'clean:app',
            'copy:styles',
            'copy:scripts',
            'copy:images',
            'concat',
            'sass:' + environment,
            'postcss',
            'lint',
            'test',
        ];
        if (environment == 'prod') {
            assetTasks.push(
                'uglify', 
                'clean:scripts',
                'clean:styles'
            );
        }
        return assetTasks;
    };
    
    // Default Grunt task
    grunt.registerTask('default', [
        'compile:' + env,
        'watch'
    ]);
      
    // Compile the app
    grunt.registerTask('compile', gruntCompile(env));
        
    // Lint
    grunt.registerTask('lint', [
        //'scsslint',
        'jshint'
    ]);
        
    // Test
    grunt.registerTask('test', [
    ]);

};
