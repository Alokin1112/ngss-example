import { Injectable } from '@angular/core';
import { ASUtil, instantiate, ResultObject } from '@assemblyscript/loader';
import { RevertChangesStringStateOperations } from 'projects/ngss/src/lib/revert-changes/revert-changes-string-state-operations.interface';
import { sortObjectKeys } from 'projects/ngss/src/lib/utils/sort-object-keys.const';
import { Observable, ReplaySubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebAssemblyService {

  private ready: ReplaySubject<void> = new ReplaySubject<void>(1);
  private _isReady = false;

  private wasmModule: ResultObject & {
    exports: ASUtil & Record<string, unknown>;
  };
  private memory: WebAssembly.Memory;

  constructor() {
    this.memory = new WebAssembly.Memory({ initial: 2, maximum: 2 });
    void this.loadWasmModule();
  }

  isReady(): boolean {
    return this._isReady;
  }

  waitForReady(): Observable<void> {
    return this.ready.asObservable().pipe(take(1));
  }

  lzwEncode(input: string): string {
    if (!this.wasmModule) {
      return '';
    }
    const { __newString, __getString } = this.wasmModule.exports;
    const __lzwEncode = this.wasmModule.exports?.['lzwEncode'] as (inputStrPtr: number) => number;

    const inputStrPtr = __newString(input);
    const outputStrPtr = __lzwEncode(inputStrPtr);
    const outputStr = __getString(outputStrPtr);

    return outputStr;
  }

  lzwDecode(input: string): string {
    if (!this.wasmModule) {
      return '';
    }
    const { __newString, __getString } = this.wasmModule.exports;
    const __lzwDecode = this.wasmModule.exports?.['lzwDecode'] as (inputStrPtr: number) => number;

    const inputStrPtr = __newString(input);
    const outputStrPtr = __lzwDecode(inputStrPtr);
    const outputStr = __getString(outputStrPtr);

    return outputStr;
  }

  getChanges(a: unknown, b: unknown): RevertChangesStringStateOperations[] {
    if (!this.wasmModule) {
      return [];
    }
    const aStringified = JSON.stringify(sortObjectKeys(a));
    const bStringified = JSON.stringify(sortObjectKeys(b));

    const { __newString, __getString, __getArray, } = this.wasmModule.exports;
    const __getChanges = this.wasmModule.exports?.['getChanges'] as (aStrPtr: number, bStrPtr: number) => number;

    const aStrPtr = __newString(aStringified);
    const bStrPtr = __newString(bStringified);
    const changesPtr = __getChanges(aStrPtr, bStrPtr);
    const changes = __getArray(changesPtr);
    const resultStringified = changes.map((ptr) => __getString(ptr));
    const result = resultStringified.map((str) => JSON.parse(str) as RevertChangesStringStateOperations);
    console.log('result', result);
    return result;
  }

  private async loadWasmModule() {
    try {
      //TODO: Sprawdzić czy można wywalic biblioteke
      this.wasmModule = await instantiate(fetch('/assets/ngss/wasm.wasm'), {
        env: {
          "console.log": (arg: any) => this.logMessage(arg),
        } as any,
      });
      this.ready.next();
      this._isReady = true;
    } catch (error) {
      console.error('Failed to load WASM module', error);
    }
  }

  private logMessage(message: number): void {
    const { __getString } = this.wasmModule.exports;
    console.log(__getString(message));
  }

}
