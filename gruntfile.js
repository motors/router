module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.initConfig({
    requirejs: {
      compile: {
        options: {
          baseUrl: './',
          mainConfigFile: 'build/build.js',
          name: 'example/js/vendor/require.js',
          out: 'router.js'
        }
      }
    }
  });

};