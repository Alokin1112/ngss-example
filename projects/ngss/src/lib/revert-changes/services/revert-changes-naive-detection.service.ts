
import { ActionInterface } from 'projects/ngss/src/lib/actions/actions.interface';
import { ReducerRevertOptions } from 'projects/ngss/src/lib/reducers/reducers-options.interface';
import { RevertChangesOptions } from 'projects/ngss/src/lib/revert-changes/revert-changes-options.interface';
import { RevertChangesSavedState, RevertChangesSavedStateService, RevertChangesService, StateChangeCallback } from 'projects/ngss/src/lib/revert-changes/revert-changes-service.interface';
import { RevertChangesStatus } from 'projects/ngss/src/lib/revert-changes/revert-changes-status.interface';


export class RevertChangesNaiveDetectionService<T> implements RevertChangesService<T> {

  constructor(
    private options: ReducerRevertOptions,
    private stateService: RevertChangesSavedStateService<T>,
  ) { }

  saveInitialState(state: T): void {
    this.stateService.clear();
    this.stateService.pushState({ data: state, dateTime: new Date() });
  }

  saveChanges<A>(newState: T, handledAction: ActionInterface<A>, changes?: Partial<T>): void {
    this.stateService.pushState({ data: changes ? changes as T : newState, dateTime: new Date(), actionType: handledAction.getType() });

    this.shiftArrayIfNeeded();
  }

  revertChanges(options: RevertChangesOptions, stateChangeCallback: StateChangeCallback<T>): RevertChangesStatus {
    const indexToRevert = this.stateService.getSpecifiedSavedStateIndex(options);
    if (indexToRevert < 0) {
      return { isSuccess: false, message: 'No saved state found' };
    }

    const previousStates = this.stateService.get(0, indexToRevert + 1);
    const stateToRevert = previousStates?.reduce((acc, state) => ({
      ...acc,
      ...state.data
    }), {} as T);
    this.stateService.remove(indexToRevert + 1, this.stateService.getLength());
    stateChangeCallback(stateToRevert);

    return { isSuccess: true };
  }

  private shiftArrayIfNeeded() {
    while (this.stateService.getLength() > this.options.maxPreviousStates + 1) {
      const savedElems = this.stateService.get(0, 2);
      const newFirstItem = {
        ...(savedElems[1] || {}),
        data: {
          ...(savedElems[0]?.data || {}),
          ...(savedElems[1]?.data || {}),
        }
      } as RevertChangesSavedState<T>;

      this.stateService.remove(0, 1);
      this.stateService.saveAt(0, newFirstItem);
    }
  }

}
