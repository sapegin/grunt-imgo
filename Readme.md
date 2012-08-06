# Image optimization for Grunt using imgo

## Overview

Inside your `grunt.js` file add a section named `imgo`. This section specifies the files to optimize and the options passed to [imgo](https://github.com/imgo/imgo). Then add

```javascript
grunt.loadNpmTasks('grunt-imgo');
```

somewhere in your `grunt.js`.

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


---

## License

The MIT License, see the included `License.md` file.
