module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bowerRequirejs: {
        target: {
          rjsConfig: 'develop/js/config.js',
          options: {
            exclude: ['requirejs']
          }
        }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: 'develop/js',
          mainConfigFile: 'develop/js/config.js',
          out: 'build/js/app.min.js',
          name: 'config',
          include: ['vendor/requirejs/require.js'],
        }
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'develop/css',
          src: ['*.css', '!*.min.css'],
          dest: 'build/css',
          ext: '.min.css'
        }]
      }
    },

    copy : {
      build : {
       expand: true,
       cwd : 'develop/',
       src: ['index-build.html'],
       dest: 'build/',
       rename: function() {
        return 'build/index.html'
       }
      }
    },

    clean : {
      build : {
        src : 'build'
      },
      tmp : {
        src : '.tmp'
      }
    },

     connect: {
      dev: {
          options: {
            hostname : 'localhost',
            open: true,
            port: 9001,
            base: 'develop'
          }
      },
      live: {
          options: {
            hostname : 'localhost',
            open: true,
            port: 9001,
            base: 'build'
          }
      }
    },



    watch: {
      options: {
          //livereload: true
      },
      
      other: {
        files: ['develop/*.html','develop/partials/*.html','Gruntfile.js']
      },

      js : {
        files: ['develop/js/**/*.js'],
        //tasks : ['clean','jshint', 'uglify']
      },
      
      scss: {
        files: ['develop/css/*.css'],
        //tasks: ['clean','sass','csslint'],
      },
    }

  });

  // Load the plugin that provides the "bower-requirejs" task.
  grunt.loadNpmTasks('grunt-bower-requirejs');

  // Load the plugin that provides the "requirejs" task.
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Load the plugin that provides the "cssmin" task.
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Load the plugin that provides the "copy" task.
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Load the plugin that provides the "clean" task.
  grunt.loadNpmTasks('grunt-contrib-clean');

    // Load the plugin that provides the "connect" task.
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Load the plugin that provides the "watch" task.
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('build', [
    'clean:build',
    'copy:build',
    'cssmin',
    'requirejs',
    'clean:tmp'
  ]);

  grunt.registerTask('updateDeps', ['bowerRequirejs']);
  grunt.registerTask('serve', ['connect:dev','watch']);
  grunt.registerTask('live', ['connect:live','watch']);

};