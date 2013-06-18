# Image optimization for Grunt using imgo

## Installation

This plugin requires Grunt 0.4.

Install [imgo](https://github.com/imgo/imgo/blob/master/README.md) (see *How to install imgo on OS X* below for instructions).

`npm install grunt-imgo --save-dev`

Add to your `Gruntfile.js`:

```javascript
grunt.loadNpmTasks('grunt-imgo');
```

Then add section named `imgo` inside `grunt.initConfig()`. See next section for details.


### Parameters

#### src `string|array`

Images list: PNG, GIF or JPEG. String or array. Wildcards are supported.

#### dest `string`

Destination path for images copying before optimizing.

``` javascript
icons: {
	src: 'static/dev/img/*.*',
	dest: 'static/build/img/'
}
```

#### options `string`

Any options you want to pass to `imgo`.

``` javascript
icons: {
	src: 'icons/*.png',
	options: '-m -b'
}
```

#### skip `boolean`

If `true` task will not be ran. In example, you can skip `imgo` on Windows (becase of difficult installation):

``` javascript
skip: require('os').platform() === 'win32'
```


### Gruntfile Example

``` javascript
module.exports = function(grunt) {
	grunt.initConfig({
		imgo: {
			icons: {
				src: 'icons/*.png'
			}
		}
	});
	grunt.loadNpmTasks('grunt-imgo');
	grunt.registerTask('default', ['imgo']);
};
```

### How to install `imgo` on OS X

[Install](https://github.com/mxcl/homebrew/wiki/Installation) Homebrew.

Run following commands in terminal:

```bash
brew install exiftool imagemagick optipng libjpeg gifsicle

formulas='pngout.rb  defluff.rb cryopng.rb imgo.rb'
for package in $formulas
do
  brew install "https://raw.github.com/imgo/imgo-tools/master/Formula/"$package
done
```

You may need to use `sudo` for `brew`, depending on your setup.


## Release History

### 2013-06-18 v0.1.1

* `dest` option (by [@smolnikov](https://github.com/smolnikov)).
* Fix `options`: cannot parse several keys.
* Verbose output of `imgo` command.

### 2013-02-18 v0.1.0

* Grunt 0.4 support.
* file option renamed to src.


---

## License

The MIT License, see the included `License.md` file.
