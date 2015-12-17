## closure_compilation_level
Choices: `'SIMPLE'`, `'ADVANCED'` , `'WHITESPACE_ONLY'`<br />
Default: `'SIMPLE'`

Choose which closure compilation level we should use.

## closure_create_source_map
Type: `Boolean`<br />
Default: `true`

If `true`, a source map file will be generated in the same directory as the `dest` file. By default it will have the same basename as the `dest` file, but with a `.map` extension.

## closure_create_source_map
Type: `Boolean`<br />
Default: `true`

Turn on closure compiler debug parameter.

## banner
Type: `String`<br />
Default: `''`

Put a string at the top of the compiled files.

## compiler_jar
Type: `String`<br />
Default: `'node_modules/google-closure-compiler/compiler.jar'`

Path to the compiler.jar file. This could be relative beginning from the google-closure-compiler directory or absolute like `'/opt/closure-compiler/compiler.jar'`.

## exec_maxBuffer
Type: `Integer`<br />
Default: `0`

Set maxBuffer if you got message "Error: maxBuffer exceeded."

## java_d32
Type: `Boolean`<br />
Default: `false`

If this is true, the jar file will be executed with `-client` and `-d32` java parameters.

## java_tieredcompilation
Type: `Boolean`<br />
Default: `true`

If this is true, the jar file will be executed with `-server` and `-XX:+TieredCompilation` java parameters.
