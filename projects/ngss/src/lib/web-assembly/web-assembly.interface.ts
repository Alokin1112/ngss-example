export interface WebAssemblyModule {
  lzwEncode(input: number): number;
  lzwDecode(encodedStr: number): number;
  getChanges(a: number, b: number): number;
  __newString(str: string): number;
  __getString(ptr: number): string;
}