module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['public/**/*.js',
              'public/*.js'],
        dest:'public/dist/production.js'
      }
    },

    // configure karma
    karma: {
      options: {
        configFile: 'karma.conf.js',
      },
      // Single-run configuration for development
      single: {
        singleRun: true,
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      build: {
        src: 'public/dist/production.js',
        dest: 'public/dist/production.min.js'
      }
    },

    jshint: {
      files: [
        'app/**/*.js',
        'public/**/*.js'
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          'public/lib/**/*.js',
          'public/dist/**/*.js',

        ]
      }
    },

    cssmin: {
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },
    docco: {
      debug: {
        src: ['public/**/*.js', 
              'server.js',
              'server-config.js'],
        options: {
          output: 'docs/'
        }
      }
    },
    concurrent: {
      target: {
        tasks:['webpack:budlejs', 'shell:start'],
        options: {
                logConcurrentOutput: true
            }
      }
    },
   shell: {
        webpackServer: {
            command: 'node ./frontend/frontend/webpackServer.js'
        },
        start: {
            command: 'node server.js --production'
        }
    },
  webpack: {
    budlejs: {
      devtool: 'eval',
      // webpack options 
      entry: "./frontend/frontend/app/app.jsx",
      output: {
          path: "frontend/frontend/assets/js/",
          filename: "bundle.js",
      },
      resolve: {
        extensions: ['', '.js', '.jsx']
      },
      
      stats: {
          colors: false,
          modules: true,
          reasons: true
      },
      module: {
        loaders: [{
          test: /\.jsx$/,
          loaders: ['jsx-loader', 'jsx?harmony']
        }]
      },
      progress: true, 
      failOnError: true, 
      watch: true, 
      keepalive: true,
    },
  }



  });


  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-webpack');



  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

grunt.registerTask('default', [
    'concurrent:target'
  ]);

  grunt.registerTask('test', ['karma'
  ]);

  grunt.registerTask('build', []);

  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
  ]);


};