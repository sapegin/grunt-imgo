/*jshint node:true*/
module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		lint: {
			files: [
				'tasks/imgo.js',
				'grunt.js'
			]
		},
		imgo: {
			test: {
				files: 'test/tmp/**'
			}
		},
		test: {
			tasks: ['test/*_test.js']
		},
		jshint: {
			options: {
				node: true,
				white: false,
				smarttabs: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				undef: true
			}
		}
	});

	grunt.loadTasks('tasks');

	var fs = require('fs');

	grunt.registerTask('clean', 'Copy files to test.', function() {
		grunt.file.expand('test/tmp/**').forEach(function(file) {
			fs.unlinkSync(file);
		});
	});

	grunt.registerTask('prepare', 'Copy files to test.', function() {
		grunt.file.expand('test/src/**').forEach(function(file) {
			grunt.file.copy(file, file.replace('/src/', '/tmp/'));
		});
	});

	grunt.registerTask('default', 'lint clean prepare imgo test clean');

};