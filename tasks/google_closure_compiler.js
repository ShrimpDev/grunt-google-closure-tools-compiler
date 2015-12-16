/*
 * grunt-google-closure-compiler
 * https://github.com/ShrimpDev/grunt-google-closure-compiler
 *
 * Copyright (c) 2015 CSoellinger
 * Licensed under the MIT license.
 */

/* global options */

'use strict';

module.exports = function (grunt) {

  var exec = require('child_process').exec;
//  var fs = require('fs');
//  var path = require('path');
//  var gzip = require('zlib').gzip;

  grunt.registerMultiTask('google_closure_compiler', 'A Grunt task for Closure Compiler.', function () {
    var compileDone = this.async(); // Asynchronous task
    //
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      closure_compilation_level: 'SIMPLE',
      closure_create_source_map: true,
      closure_debug: false,
      banner: '',
      report_file: '',
      compiler_jar: 'node_modules/google-closure-compiler/compiler.jar',
      exec_maxBuffer: 200,
      java_d32: false,
      java_tieredcompilation: true
    });

    // Check if the compiler_jar property is empty
    if (options.compiler_jar.trim() === "") {
      grunt.warn('Empty compiler_jar property.');
      return false;
    }

    // Check if the files property is empty
    if (this.files.length <= 0) {
      grunt.warn('Empty files property.');
      return false;
    }

    // Check compilation level
    if (options.closure_compilation_level !== "SIMPLE" &&
            options.closure_compilation_level !== "ADVANCED" &&
            options.closure_compilation_level !== "WHITESPACE_ONLY") {
      grunt.warn('Wrong value for compilation level. (Possible values: SIMPLE, ADVANCED, WHITESPACE_ONLY)');
      return false;
    }

    // Java command with optional parameters
    var command = 'java ' +
            (options.java_d32 === true ? '-client -d32 ' : '') +
            (options.java_tieredcompilation === true ? '-server -XX:+TieredCompilation ' : '') +
            '-jar "' + options.compiler_jar + '"';

    this.files.forEach(function (f) {
      var output_file = f.dest;
      var output_mapfile = output_file + '.map';
      var output_reportFile = options.report_file || output_file + '.report.txt';

      var javascript_files = '--js="' + f.src.join('" --js="') + '"';
      var closure_command = command + ' ' + javascript_files + ' --js_output_file="' + output_file + '"';

      // Add compilation level
      closure_command += ' --compilation_level="' + options.closure_compilation_level + '"';

      // Add source map param if necessary
      if (options.closure_create_source_map === true) {
        closure_command += ' --create_source_map="' + output_mapfile + '"';
      }

      // Add debug param if necessary
      if (options.closure_debug === true) {
        closure_command += ' --debug';
      }

      // Closure tools don't create directories, so first we create an empty file at our dest
      grunt.file.write(output_file, '');

      grunt.verbose.writeln(grunt.util.linefeed + 'Execute' + grunt.util.linefeed + closure_command + grunt.util.linefeed);

      exec(closure_command, {maxBuffer: options.exec_maxBuffer * 1024}, function (err, stdout, stderr) {
        if (err) {
          grunt.warn(err);
          compileDone(false);
        } else {
          if (options.banner.trim() !== "") {
            var tmpOutputFile = options.banner + grunt.file.read(output_file);
            grunt.file.write(output_file, tmpOutputFile);
          }

          if (options.closure_create_source_map === true) {
            var tmpOutputMapFile = grunt.file.read(output_mapfile) + grunt.util.linefeed + '//# sourceMappingURL=' + output_mapfile;
            grunt.file.write(output_mapfile, tmpOutputMapFile);
          }
        }

        if (stdout) {
          grunt.log.writeln(stdout);
        }

        compileDone();
      });
    });
  });

};
