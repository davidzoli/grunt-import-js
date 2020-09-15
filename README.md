# grunt-import-js

Import JS files within JS files by @import instruction.


## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-import-js --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-import-js');
```

## The "import_js" task

Add @import instructions to your JS files and let them be replaced by the content of the files.

```js
@import "vendor/js/jquery/jquery.min.js"; 
@import "vendor/js/bootstrap/bootstrap.min.js"; 
@import "base.js"; 
```

Optionally, you can comment out the instructions to keep your files executable without this plugin. This is also useful when using syntax checker (e.g. jshint), since "@import" is not a valid JS-statement.

```js
// @import "vendor/js/jquery/jquery.min.js"; 
// @import "vendor/js/bootstrap/bootstrap.min.js"; 
// @import "base.js"; 
```

If you want to keep the import for some future use, use the @skip instruction. This won't import the file and will remove the instruction comment from the generated file.  
Basically you can comment out the whole instruction with this.

```js
// @import "vendor/js/jquery/jquery.min.js"; 
// @skip "vendor/js/bootstrap/bootstrap.min.js"; 
// @import "base.js"; 
```

### Overview
In your project's Gruntfile, add a section named `import_js` to the data object passed into `grunt.initConfig()`. Usage Example below.


### Options

#### importDir
Type: `String`  
Default: files.cwd

Specifies an alternate location for the @import files.

#### includePaths
Type: `Array`  
Default: []

Specifies an alternate locations for the @import files. You can add more folders to check for the file.

```js
options: {
  includePaths: [
      require('path').resolve(__dirname + '/../node_modules')
  ]
}
```

With this, the script will file the `bootstrap.js` file in the `node_modules/bootstrap/dist/js/` folder.  
The file `base.js` will be found in the same folder as the includer file.

```js
// @import "bootstrap/dist/js/bootstrap.js"; 
// @import "base.js"; 
```


### Usage Examples

In this example, import-js is used to read all javascript files from `app/Resources/js/` and scan them for @import instructions. The content of the @import files then replaces the @import instruction.

```js
grunt.initConfig({
  import_js: {
    options: {
      includePaths: [
        require('path').resolve(__dirname + '/../node_modules')
      ]
    },
    files: {
      expand: true,
      cwd: 'app/Resources/js/',
      src: ['**/*.js'],
      dest: 'assets/js/',
      ext: '.js'
    }
  },
});
```


## Release History

* 2016-01-21   v0.1.4   file not found message changed from "fail.fatal" to "log.error"
* 2015-11-13   v0.1.3   fixed regex bug
* 2015-10-01   v0.1.2   readme updated
* 2015-09-30   v0.1.1   instructions are now optional, readme updated
* 2015-09-03   v0.1.0   

