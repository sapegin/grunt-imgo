# Image optimization for Grunt using imgo

## Overview

Install [imgo](https://github.com/imgo/imgo/blob/master/README.md) following instructions below.

Install `grunt-imgo`:

```
npm install grunt-imgo
```

Add somewhere in your `grunt.js`:

```javascript
grunt.loadNpmTasks('grunt-imgo');
```

Inside your `grunt.js` file add a section named `imgo`. See Parameters section below for details.


### Parameters

#### files `string|array`

Images list: PNG, GIF or JPEG. String or array. Wildcards are supported.

#### options `string`

Any options you want to pass to `imgo`.

### Config Example

``` javascript
imgo: {
  icons: {
    files: 'icons/*.png'
  }
}
```

### How to install `imgo` on Mac OS X

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


---

## License

The MIT License, see the included `License.md` file.
