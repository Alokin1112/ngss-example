

import { ActionInterface } from 'projects/ngss/src/lib/actions/actions.interface';
import { ReducerRevertOptions } from 'projects/ngss/src/lib/reducers/reducers-options.interface';
import { RevertChangesOptions } from 'projects/ngss/src/lib/revert-changes/revert-changes-options.interface';
import { RevertChangesSavedState, RevertChangesSavedStateService, RevertChangesService, StateChangeCallback } from 'projects/ngss/src/lib/revert-changes/revert-changes-service.interface';
import { RevertChangesStatus } from 'projects/ngss/src/lib/revert-changes/revert-changes-status.interface';
import { applyDiff, getDiff, rdiffResult } from 'recursive-diff';


export class RevertChangesOnlyChangedTopDownService<T> implements RevertChangesService<T> {

  /**
   * 
   * In stateService last index will be stored the upToDate state, in the rest of the indexes will be stored the previous states
  */
  constructor(
    private options: ReducerRevertOptions,
    private stateService: RevertChangesSavedStateService<T | rdiffResult[]>,
  ) { }

  saveInitialState(state: T): void {
    this.stateService.clear();
    const stateToSave: RevertChangesSavedState<T> = { data: state, dateTime: new Date() };
    this.stateService.pushState(stateToSave); //first for upToDate state
  }

  saveChanges<A>(newState: T, handledAction: ActionInterface<A>): void {
    const stateLength = this.stateService.getLength();
    const previousUpToDateState = this.stateService.get(stateLength - 1, stateLength)[0];
    const previousUpToDateStateData = previousUpToDateState?.data as T;
    if (!previousUpToDateState) {
      this.stateService.pushState({ data: newState, dateTime: new Date(), actionType: handledAction.getType() });
      return;
    }
    const diff = getDiff(newState, previousUpToDateStateData);
    const diffState: RevertChangesSavedState<rdiffResult[]> = { ...previousUpToDateState, data: diff };
    this.stateService.saveAt(stateLength - 1, diffState);
    this.stateService.pushState({ dateTime: new Date(), actionType: handledAction.getType(), data: newState });

    this.shiftArrayIfNeeded();
  }

  revertChanges(options: RevertChangesOptions, stateChangeCallback: StateChangeCallback<T>): RevertChangesStatus {
    const indexToRevert = this.stateService.getSpecifiedSavedStateIndex(options);
    if (indexToRevert < 0) {
      return { isSuccess: false, message: 'No saved state found' };
    }

    const previousStates = this.stateService.get(indexToRevert, this.stateService.getLength());
    const initialStateData = JSON.parse(JSON.stringify(previousStates[previousStates?.length - 1]?.data)) as T;
    const statesWithChanges = [...(previousStates?.slice(0, previousStates?.length - 1) || [])]?.reverse();
    const stateDataToRevert = statesWithChanges?.reduce((acc, state) => (applyDiff(acc, state?.data as rdiffResult[]) as T), initialStateData);
    this.stateService.remove(indexToRevert, this.stateService.getLength());
    this.stateService.pushState({
      ...previousStates[0],
      data: stateDataToRevert
    });

    stateChangeCallback(stateDataToRevert);

    return { isSuccess: true };
  }

  private shiftArrayIfNeeded() {
    while (this.stateService.getLength() > this.options.maxPreviousStates + 1) {
      this.stateService.remove(0, 1);
    }
  }

}
