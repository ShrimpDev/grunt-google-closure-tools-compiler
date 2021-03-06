#### compilation_level
Choices: `'SIMPLE'`, `'ADVANCED'` , `'WHITESPACE_ONLY'`<br />
Default: `'SIMPLE'`

Choose which closure compilation level we should use.

#### create_source_map
Type: `Boolean`<br />
Default: `true`

If `true`, a source map file will be generated in the same directory as the `dest` file. By default it will have the same basename as the `dest` file, but with a `.map` extension.

#### language_in
Choices: `'ECMASCRIPT3'`, `'ECMASCRIPT5'` , `'ECMASCRIPT5_STRICT'`, `'ECMASCRIPT6'`, `'ECMASCRIPT6_STRICT'`, `'ECMASCRIPT6_TYPED'`<br />
Default: `'ECMASCRIPT3' (null)`

#### language_out
Choices: `'ECMASCRIPT3'`, `'ECMASCRIPT5'` , `'ECMASCRIPT5_STRICT'`, `'ECMASCRIPT6_TYPED'`<br />
Default: `language in`

#### formatting
Choices: `'PRETTY_PRINT'`, `'PRINT_INPUT_DELIMITER'` , `'SINGLE_QUOTES'`<br />
Default: `'PRETTY_PRINT' (null)`

#### debug
Type: `Boolean`<br />
Default: `true`

Turn on closure compiler debug parameter.

#### extra_param
Type: `String`<br />
Default: `null`

Set some custom parameters for closure execution.

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
