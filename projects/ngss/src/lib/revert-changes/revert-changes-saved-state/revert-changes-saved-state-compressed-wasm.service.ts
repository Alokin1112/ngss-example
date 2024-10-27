import { RevertChangesOptions } from 'projects/ngss/src/lib/revert-changes/revert-changes-options.interface';
import { getSavedStateIndex } from 'projects/ngss/src/lib/revert-changes/revert-changes-saved-state-index-finder.const';
import { RevertChangesSavedState, RevertChangesSavedStateService } from 'projects/ngss/src/lib/revert-changes/revert-changes-service.interface';
import { WebAssemblyService } from 'projects/ngss/src/lib/web-assembly/web-assembly.service';

export class RevertChangesSavedStateCompressedWasmService<T> implements RevertChangesSavedStateService<T> {
  savedState: RevertChangesSavedState<string>[] = [];

  constructor(
    private wasmService: WebAssemblyService
  ) { }

  pushState(state: RevertChangesSavedState<T>): void {
    this.savedState.push({
      ...state,
      data: this.encodeData(state?.data || {} as T)
    });
    console.log('pushState', this.savedState);
  }

  getSavedState(): RevertChangesSavedState<T>[] {
    return this.savedState.map(state => ({
      ...state,
      data: this.decodeData(state?.data)
    }));
  }

  getSpecifiedSavedStateIndex(options: RevertChangesOptions): number {
    return getSavedStateIndex(this.savedState, options);
  }

  getLength(): number {
    return this.savedState.length;
  }

  saveAt(index: number, state: RevertChangesSavedState<T>): void {
    if (index < 0 || index >= this.savedState.length) {
      throw new Error(`Index ${index} is out of bounds`);
    }
    this.savedState[index] = {
      ...state,
      data: this.encodeData(state?.data || {} as T)
    };
  }

  get(start: number, end: number): RevertChangesSavedState<T>[] {
    return this.savedState.slice(start, end).map(state => ({
      ...state,
      data: this.decodeData(state?.data)
    }));
  }

  remove(start: number, end: number): void {
    this.savedState.splice(start, end - start);
  }


  private decodeData(data: string): T {
    const lzwDecoded = this.wasmService.lzwDecode(data);
    return JSON.parse(lzwDecoded) as T;
  }

  private encodeData(data: T): string {
    const stringifiedData = JSON.stringify(data);
    return this.wasmService.lzwEncode(stringifiedData);
  }

}
