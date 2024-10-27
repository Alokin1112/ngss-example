
import { ActionInterface } from 'projects/ngss/src/lib/actions/actions.interface';
import { ReducerRevertOptions } from 'projects/ngss/src/lib/reducers/reducers-options.interface';
import { RevertChangesOptions } from 'projects/ngss/src/lib/revert-changes/revert-changes-options.interface';
import { RevertChangesSavedStateService, RevertChangesService, StateChangeCallback } from 'projects/ngss/src/lib/revert-changes/revert-changes-service.interface';
import { RevertChangesStatus } from 'projects/ngss/src/lib/revert-changes/revert-changes-status.interface';

export class RevertChangesAllStateService<T> implements RevertChangesService<T> {


  constructor(
    private options: ReducerRevertOptions,
    private stateService: RevertChangesSavedStateService<T>,
  ) { }

  saveInitialState(state: T): void {
    this.stateService.pushState({ data: state, dateTime: new Date() });
  }

  saveChanges<A>(newState: T, handledAction: ActionInterface<A>): void {
    this.stateService.pushState({ data: newState, dateTime: new Date(), actionType: handledAction.getType() });

    this.shiftArrayIfNeeded();
  }

  revertChanges(options: RevertChangesOptions, stateChangeCallback: StateChangeCallback<T>): RevertChangesStatus {
    const indexToRevert = this.stateService.getSpecifiedSavedStateIndex(options);
    if (indexToRevert < 0) {
      return { isSuccess: false, message: 'No saved state found' };
    }

    const stateToRevert = this.stateService.get(indexToRevert, indexToRevert + 1)[0].data;
    this.stateService.remove(indexToRevert + 1, this.stateService.getLength());
    stateChangeCallback(stateToRevert);
    return { isSuccess: true };
  }

  private shiftArrayIfNeeded() {
    while (this.stateService.getLength() > this.options.maxPreviousStates + 1) {
      this.stateService.remove(0, 1);
    }
  }

}
