import { RevertChangesServiceType } from "projects/ngss/src/lib/revert-changes/revert-changes-service.interface";

export interface ReducerOptions {
  revert?: ReducerRevertOptions,
}

export const DEFAULT_REDUCER_OPTIONS: ReducerOptions = {
  revert: {
    savePreviousStateType: 'NONE',
    maxPreviousStates: 5,
  }
};

export interface ReducerRevertOptions {
  savePreviousStateType?: RevertChangesServiceType,
  maxPreviousStates?: number,
}