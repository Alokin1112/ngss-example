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

  private async loadWasmModule() {
    try {
      const response = await fetch('/assets/ngss/wasm.wasm');
      const buffer = await response.arrayBuffer();
      const wasmModule = await WebAssembly.instantiate(buffer, {});
      this.wasmModule = wasmModule.instance.exports as unknown as WebAssemblyModule;
    } catch (error) {
      console.error('Failed to load WASM module', error);
    }
  }
}
