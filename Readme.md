# Image optimization for Grunt using imgo

## Overview

Install [imgo](https://github.com/imgo/imgo/blob/master/README.md) (see *How to install imgo on OS X* below for instructions).

For Grunt 0.4: `npm install sapegin/grunt-imgo --save-dev`

For Grunt 0.3: `npm install grunt-imgo@0.0.6 --save-dev`

Add to your `Gruntfile.js`:

```javascript
grunt.loadNpmTasks('grunt-imgo');
```

Then add section named `imgo` inside `grunt.initConfig()`. See next section for details.


### Parameters

#### src `string|array`

Images list: PNG, GIF or JPEG. String or array. Wildcards are supported.

#### options `string`

Any options you want to pass to `imgo`.

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

* 2013-01-?    v0.1.0   Updating to work with Grunt v0.4.0rc5. file option renamed to src. Grunt 0.3 support dropped.


---

## License

The MIT License, see the included `License.md` file.
