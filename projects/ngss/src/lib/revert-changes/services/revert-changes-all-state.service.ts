
import { ActionInterface } from 'projects/ngss/src/lib/actions/actions.interface';
import { ReducerRevertOptions } from 'projects/ngss/src/lib/reducers/reducers-options.interface';
import { RevertChangesOptions } from 'projects/ngss/src/lib/revert-changes/revert-changes-options.interface';
import { getSavedStateIndex } from 'projects/ngss/src/lib/revert-changes/revert-changes-saved-state-index-finder.const';
import { RevertChangesSavedState, RevertChangesService, StateChangeCallback } from 'projects/ngss/src/lib/revert-changes/revert-changes-service.interface';
import { RevertChangesStatus } from 'projects/ngss/src/lib/revert-changes/revert-changes-status.interface';

export class RevertChangesAllStateService<T> implements RevertChangesService<T> {

  savedState: RevertChangesSavedState<T>[] = [];

  constructor(private options: ReducerRevertOptions) { }

  saveInitialState(state: T): void {
    this.savedState.push({ data: state, dateTime: new Date() });
  }

  saveChanges<A>(newState: T, handledAction: ActionInterface<A>): void {
    this.savedState.push({ data: newState, dateTime: new Date(), actionType: handledAction.getType() });

    this.shiftArrayIfNeeded();
    console.log(this.savedState);
  }

  revertChanges(options: RevertChangesOptions, stateChangeCallback: StateChangeCallback<T>): RevertChangesStatus {
    const indexToRevert = getSavedStateIndex(this.savedState, options);
    if (indexToRevert < 0) {
      return { isSuccess: false, message: 'No saved state found' };
    }

    console.log('revert', options, this.savedState[indexToRevert], indexToRevert);

    const stateToRevert = this.savedState[indexToRevert].data;
    this.savedState = this.savedState.slice(0, indexToRevert + 1);
    stateChangeCallback(stateToRevert);
    return { isSuccess: true };
  }

  private shiftArrayIfNeeded() {
    while (this.savedState.length > this.options.maxPreviousStates + 1) {
      this.savedState.shift();
    }
  }

}
