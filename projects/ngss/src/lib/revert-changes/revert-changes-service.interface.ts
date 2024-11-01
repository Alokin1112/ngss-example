import { ActionInterface } from "projects/ngss/src/lib/actions/actions.interface";
import { RevertChangesOptions } from "projects/ngss/src/lib/revert-changes/revert-changes-options.interface";
import { RevertChangesStatus } from "projects/ngss/src/lib/revert-changes/revert-changes-status.interface";

export interface RevertChangesService<T> {
  saveInitialState(state: T): void,
  saveChanges<A>(newState: T, handledAction: ActionInterface<A>, changes?: Partial<T>): void,
  revertChanges(options: RevertChangesOptions, stateChangeCallback: StateChangeCallback<T>): RevertChangesStatus;
}

export interface RevertChangesSavedStateService<T> {
  pushState(state: RevertChangesSavedState<T>): void,
  getSavedState(): RevertChangesSavedState<T>[],
  getSpecifiedSavedStateIndex(options: RevertChangesOptions): number,
  getLength(): number,
  saveAt(index: number, state: RevertChangesSavedState<T>): void,
  get(start: number, end: number): RevertChangesSavedState<T>[],
  remove(start: number, end: number): void,
  clear(): void
}


export type RevertChangesServiceType = 'NONE' | 'ALL_STATE' | 'ONLY_CHANGES_NAIVE' | 'ONLY_CHANGED' | 'ONLY_CHANGED_WEB_ASSEMBLY';
export type RevertChangesStateType = 'RAW' | 'COMPRESSED' | 'COMPRESSED_WEB_ASSEMBLY';

export type StateChangeCallback<T> = (state: T) => void;

/**
 * Potentially only @data field is compressed, actioType and dateTime are not compressed
 */

export interface RevertChangesSavedState<T> {
  data: T,
  actionType?: string,
  dateTime: Date
}