'use strict';

var paths = {
  js: ['*.js', 'test/**/*.js', '!test/coverage/**', '!bower_components/**', 'packages/**/*.js', '!packages/**/node_modules/**'],
  html: ['packages/**/public/**/views/**', 'packages/**/server/views/**'],
  css: ['!bower_components/**', 'packages/**/public/**/css/*.css']
};

module.exports = function(grunt) {

  if (process.env.NODE_ENV !== 'production') {
    require('time-grunt')(grunt);
  }

  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    assets: grunt.file.readJSON('config/assets.json'),
    clean: ['bower_components/build'],
    responsive_images:{
        dev:{
            options:
            {
                engine: 'im',
                sizes:
                [{ width:400	},{	width:800}]		
            },
            files:[{
                expand:true,
                src:['img/**/*.{gif,jpg,png}'],
                cwd: 'ProfileUpload/',
                dest: 'ProfileUploadResize/'
            }]
        }
    },
    watch: {
      js: {
        files: paths.js,
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      html: {
        files: paths.html,
        options: {
          livereload: true,
          interval: 500
        }
      },
      css: {
        files: paths.css,
        tasks: ['csslint'],
        options: {
          livereload: true
        }
      },
      options: {
          livereload: true
      },
      images: {
          expand: true,
          files: 'ProfileUpload/img/*.{jpg,gif,png}',
          tasks: 'responsive_images'
      }
    },
    jshint: {
      all: {
        src: paths.js,
        options: {
          jshintrc: true
        }
      }
    },
    uglify: {
      core: {
        options: {
          mangle: false
        },
        files: '<%= assets.core.js %>'
      }
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      src: paths.css
    },
    cssmin: {
      core: {
        files: '<%= assets.core.css %>'
      }
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          args: [],
          ignore: ['node_modules/**'],
          ext: 'js,html',
          nodeArgs: ['--debug'],
          delayTime: 1,
          cwd: __dirname
        }
      }
    },
    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec',
        require: [
          'server.js',
          function() {
            require('meanio/lib/util').preload(__dirname + '/packages/**/server', 'model');
          }
        ]
      },
      src: ['packages/**/server/tests/**/*.js']
    },
    env: {
      test: {
        NODE_ENV: 'test'
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
    //responsive_images: {
    //    dev: {
    //        files: [{
    //            expand: true,
    //            src: ['assets/img/**/*.{jpg,gif,png}'],
    //            cwd: 'src/',
    //            dest: 'dist/'
    //        }]
    //    }
    //}
  });


  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-responsive-images');
  //Load NPM tasks
  require('load-grunt-tasks')(grunt);

  //Default task(s).
  if (process.env.NODE_ENV === 'production') {
      grunt.registerTask('default', ['clean', 'cssmin', 'uglify', 'concurrent', 'responsive_images', 'watch']);
  } else {
    grunt.registerTask('default', ['clean', 'jshint', 'csslint', 'concurrent','responsive_images','watch']);
  }

  //Test task.
  grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);

  // For Heroku users only.
  // Docs: https://github.com/linnovate/mean/wiki/Deploying-on-Heroku
  grunt.registerTask('heroku:production', ['cssmin', 'uglify']);
    
  grunt.loadNpmTasks('grunt-node-inspector');
  //grunt.loadNpmTasks('grunt-responsive-images');
};
