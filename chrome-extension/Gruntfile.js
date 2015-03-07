module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: { install: { } },
    bower_concat: {
      all: {
        dest: 'lib/_bower.js'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        },
        jshintrc : true
      }
    },
    clean: ["lib/", "bower_components/", "dist/", "node_modules/"]
  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bower-concat');

  grunt.registerTask('default', ['bower', 'bower_concat', 'jshint']);
};
