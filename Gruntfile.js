/*
 * grunt-google-closure-compiler
 * https://github.com/ShrimpDev/grunt-google-closure-compiler
 *
 * Copyright (c) 2015 CSoellinger
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },
    // Configuration to be run (and then tested).
    googleclosurecompiler: {
      default_options: {
        options: {
        },
        files: {
          'tmp/main_default_options.js': ['test/fixtures/main_default.js', 'test/fixtures/main_default_second.js']
        }
      },
      custom_options_advanced: {
        options: {
          closure_compilation_level: 'ADVANCED'
        },
        files: {
          'tmp/custom_options_advanced.js': ['test/fixtures/main_custom.js', 'test/fixtures/main_custom_second.js']
        }
      },
      custom_options_whitespace_only: {
        options: {
          closure_compilation_level: 'WHITESPACE_ONLY',
          banner: '/*\n' +
                  ' * Testing\n' +
                  ' */\n'
        },
        files: {
          'tmp/custom_options_whitespace_only.js': ['test/fixtures/main_custom.js', 'test/fixtures/main_custom_second.js']
        }
      }
    },
    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },
    conventionalChangelog: {
      options: {
        changelogOpts: {
          preset: 'angular'
        }
      },
      release: {
        src: 'CHANGELOG.md'
      }
    },
    bump: {
      options: {
        files: ['package.json'],
        commitFiles: ['package.json'],
        pushTo: 'origin'
      }
    }

  });
  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-conventional-changelog');
  grunt.loadNpmTasks('grunt-bump');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'googleclosurecompiler:default_options', 'googleclosurecompiler:custom_options_advanced', 'googleclosurecompiler:custom_options_whitespace_only', 'nodeunit']);

  grunt.registerTask('changelog', ['conventionalChangelog']);

  grunt.registerTask('bump-up', ['default', 'bump-only:patch', 'changelog', 'bump-commit']);
  grunt.registerTask('bump-up-patch', ['bump-up']);
  grunt.registerTask('bump-up-minor', ['default', 'bump-only:minor', 'changelog', 'bump-commit']);
  grunt.registerTask('bump-up-major', ['default', 'bump-only:major', 'changelog', 'bump-commit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
