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
        compilation_level: 'ADVANCED',
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
        compilation_level: 'WHITESPACE_ONLY'
      },
      files: {
        'dest/output.min.js': ['src/**']
      }
    }
  }
});
```
