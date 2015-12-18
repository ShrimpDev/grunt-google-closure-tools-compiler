# grunt-google-closure-tools-compiler

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![Build Status](https://travis-ci.org/ShrimpDev/grunt-google-closure-tools-compiler.svg)](https://travis-ci.org/ShrimpDev/grunt-google-closure-tools-compiler)

> A Grunt task for Closure Compiler to minify JS.

<!-- toc -->

* [Getting Started](#getting-started)
* [closurecompiler task](#closurecompiler-task)
  - [Options](#options)
  - [Usage Examples](#usage-examples)
* [Release History](#release-history)
* [ToDo](#todo)
* [Author](#author)
* [License](#license)

_(Table of contents generated by [verb])_

<!-- tocstop -->

## Getting Started

This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

Install with [npm](https://www.npmjs.com/)

```sh
$ npm install grunt-google-closure-tools-compiler --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-google-closure-tools-compiler');
```

## closurecompiler task

_Run this task with the `grunt closurecompiler` command._

This task requires that you have the closure compiler jar file anywhere on your building machine. However, this plugin loads with npm the compiler.jar and set it as default compiler. You still can use a custom or another build from closure to set a new path to the
jar file you want.

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### closure_compilation_level

Choices: `'SIMPLE'`, `'ADVANCED'` , `'WHITESPACE_ONLY'`<br />
Default: `'SIMPLE'`

Choose which closure compilation level we should use.

#### closure_create_source_map

Type: `Boolean`<br />
Default: `true`

If `true`, a source map file will be generated in the same directory as the `dest` file. By default it will have the same basename as the `dest` file, but with a `.map` extension.

#### closure_create_source_map

Type: `Boolean`<br />
Default: `true`

Turn on closure compiler debug parameter.

#### banner

Type: `String`<br />
Default: `''`

Put a string at the top of the compiled files.

#### compiler_jar

Type: `String`<br />
Default: `'node_modules/google-closure-compiler/compiler.jar'`

Path to the compiler.jar file. This could be relative beginning from the google-closure-compiler directory or absolute like `'/opt/closure-compiler/compiler.jar'`.

#### exec_maxBuffer

Type: `Integer`<br />
Default: `0`

Set maxBuffer if you got message "Error: maxBuffer exceeded."

#### java_path

Type: `String`<br />
Default: `null`

We use this path if it is setted. NOTE: If it is `null` we can also set the JAVA_HOME environment variable

#### java_d32

Type: `Boolean`<br />
Default: `false`

If this is true, the jar file will be executed with `-client` and `-d32` java parameters.

#### java_tieredcompilation

Type: `Boolean`<br />
Default: `true`

If this is true, the jar file will be executed with `-server` and `-XX:+TieredCompilation` java parameters.

### Usage Examples

#### Basic compression

```js
// Project configuration.
grunt.initConfig({
  googleclosurecompiler: {
    my_target: {
      files: {
        'dest/output.min.js': ['src/input1.js', 'src/input2.js']
      }
    }
  }
});
```

#### Advanced compilation

```js
// Project configuration.
grunt.initConfig({
  googleclosurecompiler: {
    my_target: {
      options: {
        closure_compilation_level: 'ADVANCED',
        banner: '/*\n' +
                ' * Minified by closure compiler \n' +
                ' */\n'
      },
      files: {
        'dest/output.min.js': ['src/*.js']
      }
    }
  }
});
```

#### All files with all subdirectories

```js
// Project configuration.
grunt.initConfig({
  googleclosurecompiler: {
    my_target: {
      options: {
        closure_compilation_level: 'WHITESPACE_ONLY'
      },
      files: {
        'dest/output.min.js': ['src/**']
      }
    }
  }
});
```

## Release History

<a name="0.1.3"></a>

## [0.1.3](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/compare/v0.1.2...v0.1.3) (2015-12-18)

### Bug Fixes

* **bump:** Fixing peerDependencies reference inside readme ([da7553e](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/commit/da7553e))

<a name="0.1.2"></a>

#### [0.1.2](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/compare/v0.1.1...v0.1.2) (2015-12-18)

##### Bug Fixes

* **task:** Catch error if files object is empty or dest file has an empty array ([bd37307](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/commit/bd37307))
* **travis-ci:** Removing npm uninstall grunt ([1959803](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/commit/1959803))

##### Features

* **task:** Add JAVA_HOME and option.java_path to set the java binary path ([2c24e70](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/commit/2c24e70))

<a name="0.1.1"></a>

#### [0.1.1](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/compare/v0.1.0...v0.1.1) (2015-12-17)

##### Bug Fixes

* **travis-ci:** Removing npm uninstall grunt ([1959803](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/commit/1959803))

<a name="0.1.0"></a>

### [0.1.0](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/compare/v0.1.0...v0.1.0) (2015-12-17)

## ToDo

### Some stuff we have to do...

* Write tests https://travis-ci.org
* Print out some reports after compiling
* Make closure externs possible
* Add formatting param `[PRETTY_PRINT | PRINT_INPUT_DELIMITER | SINGLE_QUOTES]`
* Add language_in param `ECMASCRIPT3 (default), ECMASCRIPT5, ECMASCRIPT5_STRICT, ECMASCRIPT6, ECMASCRIPT6_STRICT, ECMASCRIPT6_TYPED (experimental)`
* Add language_out param `ECMASCRIPT3, ECMASCRIPT5, ECMASCRIPT5_STRICT, ECMASCRIPT6_TYPED (experimental)`
* Support "--js closure-library/closure/goog/deps.js" https://github.com/thanpolas/grunt-closure-tools/issues/64
*
  - google-closure-library
* Enhancement: change compilation levels for certain files. https://github.com/gmarty/grunt-closure-compiler/issues/13
* How to compile js files and put them into the same directory https://github.com/gmarty/grunt-closure-compiler/issues/25
*
  - Check if output file exists in file array and sort it out

## Author

**CSoellinger**

+ [github/ShrimpDev](https://github.com/ShrimpDev)
* [twitter/Zerogiven](http://twitter.com/Zerogiven)

## License

Copyright © 2015 CSoellinger
Released under the [MIT](https://github.com/ShrimpDev/grunt-google-closure-tools-compiler/blob/master/LICENSE-MIT) license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on December 18, 2015._
