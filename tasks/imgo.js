/**
 * Image optimization for Grunt using imgo
 *
 * @requires https://github.com/imgo/imgo
 * @author Artem Sapegin (http://sapegin.me)
 */

/*jshint node:true */
module.exports = function(grunt) {
	'use strict';

	var fs = require('fs');
	var util = grunt.util || grunt.utils;  // Grunt 0.3/0.4 compatibility

	grunt.registerMultiTask('imgo', 'Optimize images using imgo', function() {
		this.requiresConfig([ this.name, this.target, 'files' ].join('.'));

		var done = this.async();
		var params = this.data;
		var nl = true;

		if (params.skip) {
			return done();
		}

		var files = grunt.file.expandFiles(params.files);
		util.async.forEach(files, function(file, nextFile) {
			optimize({
				file: file,
				args: params.options,
				done: function(data) {
					if (!data.err) {
						if (data.compressed) {
							if (!nl) grunt.log.writeln();
							grunt.log.writeln("File '" + file + "': saved " + String(data.saved).green + " bytes " +
									"(" + String(Math.round(data.saved/data.before*100)).green + "%".green + ")");
							nl = true;
						}
						else {
							grunt.log.write('.');
							nl = false;
						}
					}
					nextFile();
				}
			});
		}, function() {
			if (!nl) grunt.log.writeln();
			done();
		});
	});

	function optimize(options) {
		var file = options.file;
		var beforeBytes = fs.statSync(file).size;

		var args = [file];
		if (options.args) {
			args.unshift(options.args);
		}
		return util.spawn({
			cmd: 'imgo',
			args: args
		}, function(err, result, code) {
			if (!err) {
				var afterBytes = fs.statSync(file).size;
				if (afterBytes < beforeBytes) {
					return options.done({
						compressed: true,
						before: beforeBytes,
						after: beforeBytes,
						saved: beforeBytes - afterBytes
					});
				}
				else {
					return options.done({ compressed: false });
				}
			}

			// Something went horribly wrong
			grunt.verbose.or.writeln();
			if (code === 127) {
				grunt.log.errorlns('Please install imgo: https://github.com/imgo/imgo');
				grunt.warn('imgo not found', options.code);
			}
			else {
				result.split('\n').forEach(grunt.log.error, grunt.log);
				grunt.warn('imgo exited unexpectedly with exit code ' + code + '.', options.code);
			}
			options.done({ err: code });
		});
	}
};
