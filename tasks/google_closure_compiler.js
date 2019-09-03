/*
 * grunt-google-closure-tools-compiler-compiler
 * https://github.com/ShrimpDev/grunt-google-closure-tools-compiler
 *
 * Copyright (c) 2015 CSoellinger
 * Licensed under the MIT license.
 */

/* global options */

'use strict';

module.exports = function(grunt) {

var exec = require('child_process').exec;
var fs = require('fs');
var readline = require('readline');
var _isUndefined = require('lodash/isUndefined');
var _isWin = /^win/.test(process.platform);
var async = grunt.util.async;

var possible_options = {
    compilation_level: ['SIMPLE', 'ADVANCED', 'WHITESPACE_ONLY'],
    language_in: ['ECMASCRIPT3', 'ECMASCRIPT5', 'ECMASCRIPT5_STRICT', 'ECMASCRIPT6', 'ECMASCRIPT6_STRICT', 'ECMASCRIPT6_TYPED'],
    language_out: ['ECMASCRIPT3', 'ECMASCRIPT5', 'ECMASCRIPT5_STRICT', 'ECMASCRIPT6_TYPED'],
    formatting: ['PRETTY_PRINT', 'PRINT_INPUT_DELIMITER', 'SINGLE_QUOTES']
};

var getFilesizeInBytesfunction = function(filename) {
    var stats = fs.statSync(filename);
    var fileSizeInBytes = stats["size"];
    return fileSizeInBytes;
};
//  var path = require('path');
//  var gzip = require('zlib').gzip;

grunt.registerMultiTask('closurecompiler', 'A Grunt task for Closure Compiler.', function() {
    var self = this,
        compileDone = this.async(); // Asynchronous task

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
        compilation_level: 'SIMPLE',
        create_source_map: true,
        language_in: null,
        language_out: null,
        formatting: null,
        debug: false,
        extra_param: null,
        output_wrapper: null,
        banner: '',
        report_file: '',
        compiler_jar: 'node_modules/google-closure-compiler/compiler.jar',
        exec_maxBuffer: 200,
        java_path: null,
        java_d32: false,
        java_tieredcompilation: (_isWin ? false : true),
        spinner: '|/-\\'.split(''),
        progress_text: '%s Compiling JS file...'
    });

    // Check if the compiler_jar property is empty
    if (options.compiler_jar.trim() === "") {
        grunt.fail.warn('Empty compiler_jar property. No compilation executed...');
        compileDone(false);
    }

    // Check if the files property is empty
    if (this.files.length <= 0) {
        grunt.fail.warn('Empty files property.');
        compileDone(false);
    }

    if (possible_options.compilation_level.indexOf(options.compilation_level) === -1) {
        grunt.fail.warn('Wrong value for compilation level. (Possible values: ' + possible_options.compilation_level.join(',') + ')');
        compileDone(false);
    }

    if (options.language_in !== null) {
        if (possible_options.language_in.indexOf(options.language_in) === -1) {
            grunt.fail.warn('Wrong value for language in. (Possible values: ' + possible_options.language_in.join(',') + ')');
            compileDone(false);
        }
    }

    if (options.language_out !== null) {
        if (possible_options.language_out.indexOf(options.language_out) === -1) {
            grunt.fail.warn('Wrong value for language out. (Possible values: ' + possible_options.language_out.join(',') + ')');
            compileDone(false);
        }
    }

    if (options.formatting !== null) {
        if (possible_options.formatting.indexOf(options.formatting) === -1) {
            grunt.fail.warn('Wrong value for formatting. (Possible values: ' + possible_options.formatting.join(',') + ')');
            compileDone(false);
        }
    }

    var java_path = 'java' + (_isWin ? 'w' : '');

    // If we have setted JAVA_HOME we would prefer this
    if (!_isUndefined(process.env.JAVA_HOME)) {
        java_path = process.env.JAVA_HOME + '/bin/java' + (_isWin ? 'w' : '');
    }

    // At least the user can set it by config
    if (options.java_path !== null) {
        java_path = options.java_path;
    }

    // Java command with optional parameters
    var java_command = java_path + ' ' +
        (options.java_d32 === true ? '-client -d32 ' : '') +
        (options.java_tieredcompilation === true ? '-server -XX:+TieredCompilation ' : '') +
        '-jar "' + options.compiler_jar + '"';

    async.forEach(this.files, function(f) {
        grunt.verbose.writeflags(f.src, "Input files");

        if (f.src.length === 0) {
            grunt.fail.warn('No javascript files given');
            compileDone(false);
        }

        var output_file = f.dest,
            current = 0,
            output_mapfile = output_file + '.map',
            output_reportFile = options.report_file || output_file + '.report.txt',
            fSrcSizeTotal = 0.0,
            fileInputArray = [];

        if (typeof f.src === 'string') {
            f.src = [f.src];
        }

        f.src.forEach(function(fSrc) {
            if (fSrc !== output_file) {
                fileInputArray.push(fSrc);

                var fSrcSize = getFilesizeInBytesfunction(fSrc) / 1000.0;
                grunt.verbose.writeln('Input ' + fSrc + ' (' + fSrcSize.toFixed(2) + ' KB)');
                fSrcSizeTotal += fSrcSize;
            }
        });

        var javascript_files = '--js="' + fileInputArray.join('" --js="') + '"';
        var command_line = '';

        if (_isWin) {
            if (typeof options.output_wrapper === 'string') {
                options.output_wrapper = options.output_wrapper.replace(/[\r\n]+/, ' ');
            }
        }

        command_line += java_command + ' ' + javascript_files + ' --js_output_file="' + output_file + '"';

        // Add compilation level
        command_line += ' --compilation_level="' + options.compilation_level + '"';

        // Add source map param if necessary
        if (options.create_source_map === true) {
            command_line += ' --create_source_map="' + output_mapfile + '"';
        }

        if (options.language_in !== null) {
            command_line += ' --language_in="' + options.language_in + '"';
        }

        if (options.language_out !== null) {
            command_line += ' --language_out="' + options.language_out + '"';
        }

        if (options.formatting !== null) {
            command_line += ' --formatting="' + options.formatting + '"';
        }

        if (typeof options.output_wrapper === 'string') {
            command_line += ' --output_wrapper="' + options.output_wrapper + '"';
        }

        // Add debug param if necessary
        if (options.debug === true) {
            command_line += ' --debug';
        }

        if (options.extra_param !== null) {
            command_line += ' ' + options.extra_param;
        }

        //console.log(command_line);

        // Closure tools don't create directories, so first we create an empty file at our dest
        grunt.file.write(output_file, '');

        grunt.verbose.writeln(grunt.util.linefeed + 'Execute' + grunt.util.linefeed + command_line + grunt.util.linefeed);

        grunt.log.writeln('Input  total size ' + fSrcSizeTotal.toFixed(2) + ' KB');

        if (process.stdout) {
            self.id = setInterval(function() {
                readline.clearLine(process.stdout, 0);
                readline.cursorTo(process.stdout, 0);
                process.stdout.write(options.progress_text.replace('%s', options.spinner[current]));
                current = ++current % options.spinner.length;
            }, 100);
        }

        exec(command_line, { maxBuffer: options.exec_maxBuffer * 1024 }, function(err, stdout, stderr) {
            if (err) {
                grunt.warn(err);
                compileDone(false);
            } else {
                if (options.banner.trim() !== '') {
                    var tmpOutputFile = grunt.file.read(output_file);
                    if (~options.banner.indexOf('%output%')) {
                        tmpOutputFile = options.banner.replace(/%output%/, tmpOutputFile);
                    } else {
                        tmpOutputFile = options.banner + tmpOutputFile;
                    }
                    grunt.file.write(output_file, tmpOutputFile);
                }

                if (options.create_source_map === true) {
                    var tmpOutputMapFile = grunt.file.read(output_mapfile) + grunt.util.linefeed + '//# sourceMappingURL=' + output_mapfile;
                    grunt.file.write(output_mapfile, tmpOutputMapFile);
                }
            }

            var outputSize = getFilesizeInBytesfunction(output_file) / 1000;
            var minifiedPercent = (outputSize.toFixed(2) / (fSrcSizeTotal.toFixed(2) / 100));

            if (process.stdout) {
                clearInterval(self.id);
                self.id = undefined;
                readline.clearLine(process.stdout, 0);
                readline.cursorTo(process.stdout, 0);
            }

            grunt.log.writeln('Output total size ' + outputSize.toFixed(2) + ' KB [' + (minifiedPercent > 0 ? '-' + (100 - minifiedPercent) : '0') + '%]');
            grunt.verbose.writeln('Output file ' + output_file);

            if (stdout) {
                grunt.log.writeln(stdout);
            }
        });
    }, function (error) {
        grunt.log.ok('Compiled succesfully.');
        compileDone(!error);
    });
});

};
