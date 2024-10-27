export interface WebAssemblyModule {
  add(a: number, b: number): number;
  lzwEncode(input: string): string;
  lzwDecode(encodedStr: string): string;
}