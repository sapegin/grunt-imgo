/**
 * Image optimization for Grunt using imgo
 *
 * @requires https://github.com/imgo/imgo
 * @author Artem Sapegin (http://sapegin.me)
 */

/*jshint node:true */
module.exports = function(grunt) {
	'use strict';

	var util = grunt.util || grunt.utils;  // Grunt 0.3/0.4 compatibility

	grunt.registerMultiTask('imgo', 'Optimize images using imgo', function() {
		this.requiresConfig([ this.name, this.target, 'files' ].join('.'));

		var done = this.async(),
			params = this.data;

		if (params.skip) {
			done();
			return;
		}

		var files = grunt.file.expandFiles(params.files);
		grunt.util.async.forEach(files, function(file, nextFile) {
			var args = [file];
			if (params.options) {
				args.unshift(params.options);
			}
			process({
				args: args,
				done: function(data) {
					if (!data.err && data.compressed) {
						grunt.log.writeln("File '" + file + "': saved " + String(data.saved).green + " bytes " +
								"(" + String(Math.round(data.saved/data.before*100)).green + "%".green + ")");
					}
					nextFile();
				}
			});
		}, function() {
			done();
		});
	});

	function process(options) {
		return util.spawn({
			cmd: 'imgo',
			args: options.args
		}, function(err, result, code) {
			if (!err) {
				var fields = result.split('\n')[0].split(' '),
					before = parseInt(fields[1], 10),
					after = parseInt(fields[3], 10),
					saved = before - after;
				if (!isNaN(saved) && saved > 0) {
					return options.done({
						compressed: true,
						before: before,
						after: before,
						saved: saved
					});
				}
				else {
					return options.done({ compressed: false });
				}
			}

			// Something went horribly wrong
			grunt.verbose.or.writeln();
			grunt.log.write('Running imgo...').error();
			if (code === 127) {
				grunt.log.errorlns(
					'Please install imgo: https://github.com/imgo/imgo'
				);
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
