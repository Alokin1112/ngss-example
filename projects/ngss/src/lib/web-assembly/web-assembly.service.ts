import { Injectable } from '@angular/core';
import { WebAssemblyModule } from 'projects/ngss/src/lib/web-assembly/web-assembly.interface';

@Injectable({
  providedIn: 'root'
})
export class WebAssemblyService {

  private wasmModule: WebAssemblyModule;

  constructor() {
    void this.loadWasmModule();
  }

  add(a: number, b: number): number {
    return this.wasmModule.add(a, b);
  }

  lzwEncode(input: string): string {
    return this.wasmModule?.lzwEncode(input) || input;
  }

  lzwDecode(encodedStr: string): string {
    return this.wasmModule?.lzwDecode(encodedStr) || encodedStr;
  }

  private async loadWasmModule() {
    try {
      const response = await fetch('/assets/ngss/wasm.wasm');
      const buffer = await response.arrayBuffer();
      const importObject = {
        env: {
          abort(_msg: unknown, _file: unknown, line: unknown, column: unknown) {
            console.error("abort called at main.ts:" + line + ":" + column);
          },
          memory: new WebAssembly.Memory({ initial: 256, maximum: 256 }),
        }
      }; // No special imports needed
      const wasmModule = await WebAssembly.instantiate(buffer, importObject);
      this.wasmModule = wasmModule.instance.exports as unknown as WebAssemblyModule;
    } catch (error) {
      console.error('Failed to load WASM module', error);
    }
  }
}
