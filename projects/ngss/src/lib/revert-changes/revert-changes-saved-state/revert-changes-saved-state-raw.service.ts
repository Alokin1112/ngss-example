import { RevertChangesOptions } from 'projects/ngss/src/lib/revert-changes/revert-changes-options.interface';
import { getSavedStateIndex } from 'projects/ngss/src/lib/revert-changes/revert-changes-saved-state-index-finder.const';
import { RevertChangesSavedState, RevertChangesSavedStateService } from 'projects/ngss/src/lib/revert-changes/revert-changes-service.interface';

export class RevertChangesSavedStateRawService<T> implements RevertChangesSavedStateService<T> {

  savedState: RevertChangesSavedState<T>[] = [];

  pushState(state: RevertChangesSavedState<T>): void {
    this.savedState.push(state);
    // if (this.savedState.length > 2) {
    //   console.log(diffStrings(JSON.stringify(this.savedState[this.savedState.length - 2].data), JSON.stringify(this.savedState[this.savedState.length - 1].data)));
    // }
  }

  getSavedState(): RevertChangesSavedState<T>[] {
    return this.savedState;
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
    this.savedState[index] = state;
  }

  get(start: number, end: number): RevertChangesSavedState<T>[] {
    return this.savedState.slice(start, end);
  }

  remove(start: number, end: number): void {
    this.savedState.splice(start, end - start);
  }

  clear(): void {
    this.savedState = [];
  }

}
