export = safeEval;

interface ContextOptions {
  displayErrors: boolean; // When true, if an Error occurs while compiling the code, the line of code causing the error is attached to the stack trace. Default: true.
  timeout: number; // Specifies the number of milliseconds to execute code before terminating execution. If execution is terminated, an Error will be thrown. This value must be a strictly positive integer.
  breakOnSigint: boolean; // If true, the execution will be terminated when SIGINT (Ctrl+C) is received. Existing handlers for the event that have been attached via process.on('SIGINT') will be disabled during script execution, but will continue to work after that. If execution is terminated, an Error will be thrown. Default: false.
  contextName: string; // Human-readable name of the newly created context. Default: 'VM Context i', where i is an ascending numerical index of the created context.
  contextOrigin: string; // Origin corresponding to the newly created context for display purposes. The origin should be formatted like a URL, but with only the scheme, host, and port (if necessary), like the value of the url.origin property of a URL object. Most notably, this string should omit the trailing slash, as that denotes a path. Default: ''.
  contextCodeGeneration: {
    strings: boolean; // If set to false any calls to eval or function constructors (Function, GeneratorFunction, etc) will throw an EvalError. Default: true.
    wasm: boolean; // If set to false any attempt to compile a WebAssembly module will throw a WebAssembly.CompileError. Default: true.
  };
}

declare function safeEval<C extends object>(code: string, context?: C, opts?: ContextOptions): any;
