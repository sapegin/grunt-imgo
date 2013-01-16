var fs = require('fs'),
	grunt = require('grunt');

exports.imgo = {
	compile: function(test) {
		'use strict';

		var files = grunt.file.expand('test/src/**/*');

		test.expect(files.length);

		files.forEach(function(srcFile) {
			var dstFile = srcFile.replace('/src/', '/tmp/'),
				srcSize = fs.statSync(srcFile).size,
				dstSize = fs.statSync(dstFile).size;
			test.ok(dstSize < srcSize, 'Resulting file should be less than source.');
		});

		test.done();
	}
};
