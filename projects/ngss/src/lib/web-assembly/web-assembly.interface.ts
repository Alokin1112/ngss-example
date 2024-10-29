export interface WebAssemblyModule {
  lzwEncode(input: number): number;
  lzwDecode(encodedStr: number): number;
  __newString(str: string): number;
  __getString(ptr: number): string;
}