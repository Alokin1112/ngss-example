import { ActionInterface, RevertChangesOptions, RevertChangesStatus } from 'ngss';
import { ReducerRevertOptions } from 'projects/ngss/src/lib/reducers/reducers-options.interface';
import { RevertChangesSavedState, RevertChangesSavedStateService, RevertChangesService, StateChangeCallback } from 'projects/ngss/src/lib/revert-changes/revert-changes-service.interface';
import { RevertChangesStringStateOperations } from 'projects/ngss/src/lib/revert-changes/revert-changes-string-state-operations.interface';
import { stringStateChangesReverter } from 'projects/ngss/src/lib/revert-changes/string-state-changes-reverter.const';
import { WebAssemblyService } from 'projects/ngss/src/lib/web-assembly/web-assembly.service';

export class RevertChangesOnlyChangedStringService<T> implements RevertChangesService<T> {

  /**
   * 
   * In stateService 0 index will be stored the upToDate state, in the rest of the indexes will be stored the previous states
  */
  constructor(
    private options: ReducerRevertOptions,
    private stateService: RevertChangesSavedStateService<T | RevertChangesStringStateOperations[]>,
    private wasmService: WebAssemblyService,
  ) { }

  saveInitialState(state: T): void {
    this.stateService.clear();
    const stateToSave: RevertChangesSavedState<T> = { data: state, dateTime: new Date() };
    this.stateService.pushState(stateToSave); //first for upToDate state
    this.stateService.pushState(stateToSave); //second for previous state
  }

  saveChanges<A>(newState: T, handledAction: ActionInterface<A>): void {
    const previousUpToDateState = this.stateService.get(0, 1)[0]?.data as T;
    if (!previousUpToDateState) {
      this.stateService.pushState({ data: newState, dateTime: new Date(), actionType: handledAction.getType() });
      return;
    }
    const diff = this.wasmService.getChanges(previousUpToDateState, newState);
    const diffState: RevertChangesSavedState<RevertChangesStringStateOperations[]> = { data: diff, dateTime: new Date(), actionType: handledAction.getType() };

    this.stateService.pushState(diffState);
    this.stateService.saveAt(0, { ...diffState, data: newState });

    console.log(diff)

    this.shiftArrayIfNeeded();
  }

  revertChanges(options: RevertChangesOptions, stateChangeCallback: StateChangeCallback<T>): RevertChangesStatus {
    const indexToRevert = this.stateService.getSpecifiedSavedStateIndex(options);
    if (indexToRevert < 1) { // 0 index is the upToDate state so we can't revert to it
      return { isSuccess: false, message: 'No saved state found' };
    }

    const previousStates = this.stateService.get(1, indexToRevert + 1);
    const initialStateData = JSON.parse(JSON.stringify(previousStates[0]?.data)) as T;
    const statesWithChanges = previousStates.slice(1) || [];
    const stateDataToRevert = statesWithChanges?.reduce((acc, state) => (stringStateChangesReverter(acc, state?.data as RevertChangesStringStateOperations[])), initialStateData);
    this.stateService.remove(indexToRevert + 1, this.stateService.getLength());
    this.stateService.saveAt(0, {
      ...previousStates[previousStates.length - 1],
      data: stateDataToRevert
    });
    stateChangeCallback(stateDataToRevert);

    return { isSuccess: true };
  }

  private shiftArrayIfNeeded() {
    while (this.stateService.getLength() > this.options.maxPreviousStates + 2) {
      const savedStates = this.stateService.get(1, 3);
      const newInitialState = {
        ...(savedStates[1] || {}),
        data: stringStateChangesReverter(savedStates[0]?.data as T, savedStates[1]?.data as RevertChangesStringStateOperations[])
      } as RevertChangesSavedState<T>;
      this.stateService.remove(1, 2);
      this.stateService.saveAt(1, newInitialState);
    }
  }

}
