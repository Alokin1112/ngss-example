import { ActionInterface } from "projects/ngss/src/lib/actions/actions.interface";
import { RevertChangesOptions } from "projects/ngss/src/lib/revert-changes/revert-changes-options.interface";
import { RevertChangesStatus } from "projects/ngss/src/lib/revert-changes/revert-changes-status.interface";

export interface RevertChangesService<T> {
  saveInitialState(state: T): void,
  saveChanges<A>(newState: T, handledAction: ActionInterface<A>): void,
  revertChanges(options: RevertChangesOptions, stateChangeCallback: StateChangeCallback<T>): RevertChangesStatus;
}

export type RevertChangesServiceType = 'NONE' | 'ALL_STATE' | 'ONLY_CHANGED' | 'ONLY_CHANGED_WEB_ASSEMBLY';

export type StateChangeCallback<T> = (state: T) => void;

export interface RevertChangesSavedState<T> {
  data: T,
  actionType?: string,
  dateTime: Date
}