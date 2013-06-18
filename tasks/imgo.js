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
	var path = require('path');

	grunt.registerMultiTask('imgo', 'Optimize images using imgo', function() {
		this.requiresConfig([ this.name, this.target, 'src' ].join('.'));

		var done = this.async();
		var params = this.data;
		var nl = true;

		if (params.skip) {
			return done();
		}

		grunt.util.async.forEach(this.filesSrc, function(file, nextFile) {

			if (params.dest) {
				var newFile = path.join(params.dest, path.basename(file));
				grunt.file.copy(file, newFile);
				file = newFile;
			}

			optimize({
				file: file,
				args: params.options,
				done: function(data) {
					if (!data.err) {
						if (data.compressed) {
							if (!nl) grunt.log.writeln();
							grunt.log.writeln(
								"File '" + file + "': saved " + String(data.saved).green + " bytes " +
								"(" + (data.percent+"%").green + ")"
							);
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

		var args = [];
		if (options.args) {
			args = args.concat(options.args.split(' '));
		}
		args.push(file);

		grunt.verbose.writeln('Run imgo: ' + ('imgo ' + args.join(' ')).cyan);
		return grunt.util.spawn({
			cmd: 'imgo',
			args: args
		}, function(err, result, code) {
			if (!err) {
				var afterBytes = fs.statSync(file).size;
				if (afterBytes < beforeBytes) {
					var saved = beforeBytes - afterBytes;
					return options.done({
						compressed: true,
						saved: saved,
						percent: Math.round(saved/beforeBytes*100)
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
