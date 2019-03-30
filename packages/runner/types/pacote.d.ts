export function clearMemoized(): void;
export function extract(spec: any, dest: any, opts?: any): any;
export function manifest(spec: any, opts: any): any;
export function packument(spec: any, opts: any): any;
export function prefetch(spec: any, opts: any): any;
export function tarball(spec: any, opts: any): any;
export namespace tarball {
  function stream(spec: any, opts: any): any;
  function toFile(spec: any, dest: any, opts: any): any;
}
