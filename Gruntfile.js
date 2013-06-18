module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			files: [
				'tasks/imgo.js',
				'Gruntfile.js'
			]
		},
		imgo: {
			test1: {
				src: 'test/tmp/**/*'
			},
			test2: {
				src: ['test/tmp/**/*']
			},
			opts: {
				options: '-m -b',
				src: ['test/tmp/**/*']
			}
		},
		nodeunit: {
			tasks: ['test/*_test.js']
		},
		clean: ['test/tmp']
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadTasks('tasks');

	grunt.registerTask('prepare', 'Copy files to test.', function() {
		grunt.file.expand('test/src/**/*').forEach(function(file) {
			grunt.file.copy(file, file.replace('/src/', '/tmp/'));
		});
	});

	grunt.registerTask('default', ['jshint', 'clean', 'prepare', 'imgo:test1', 'nodeunit', 'clean',
		'prepare', 'imgo:test2', 'nodeunit', 'clean', 'prepare', 'imgo:opts', 'nodeunit', 'clean']);

};
