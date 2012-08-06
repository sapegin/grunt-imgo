# Image optimization for Grunt using imgo

## Installation

1. Install `imgo` following [instructions](https://github.com/imgo/imgo/blob/master/README.md).

2. Install `grunt-imgo`:

```
npm install grunt-imgo
```

3. Add somewhere in your `grunt.js`:

```javascript
grunt.loadNpmTasks('grunt-imgo');
```

4. Inside your `grunt.js` file add a section named `imgo`. See Parameters section below for details.

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
