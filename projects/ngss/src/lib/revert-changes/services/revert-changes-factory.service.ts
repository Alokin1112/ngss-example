import { Injectable } from '@angular/core';
import { ReducerRevertOptions } from 'projects/ngss/src/lib/reducers/reducers-options.interface';
import { RevertChangesSavedStateFactoryService } from 'projects/ngss/src/lib/revert-changes/revert-changes-saved-state/revert-changes-saved-state-factory.service';
import { RevertChangesService } from 'projects/ngss/src/lib/revert-changes/revert-changes-service.interface';
import { RevertChangesAllStateService } from 'projects/ngss/src/lib/revert-changes/services/revert-changes-all-state.service';
import { RevertChangesNaiveDetectionService } from 'projects/ngss/src/lib/revert-changes/services/revert-changes-naive-detection.service';
import { RevertChangesNoneService } from 'projects/ngss/src/lib/revert-changes/services/revert-changes-none.service';
import { RevertChangesOnlyChangedService } from 'projects/ngss/src/lib/revert-changes/services/revert-changes-only-changed.service';

@Injectable()
export class RevertChangesFactoryService {

  private readonly NONE_REDUCER_SINGLETON = new RevertChangesNoneService<unknown>();

  constructor(
    private revertChangesSavedStateFactoryService: RevertChangesSavedStateFactoryService
  ) { }

  get<T>(options: ReducerRevertOptions): RevertChangesService<T> {

    if (options?.maxPreviousStates <= 1 && options?.savePreviousStateType !== 'NONE') {
      throw new Error(`maxPreviousStates must be greater than 0, but it is ${options?.maxPreviousStates}`);
    }

    const savePreviousStateService = this.revertChangesSavedStateFactoryService.get<T>(options.savePreviousStateSaveType);

    switch (options?.savePreviousStateType) {
      case 'NONE':
        return this.NONE_REDUCER_SINGLETON;
      case 'ALL_STATE':
        return new RevertChangesAllStateService<T>(options, savePreviousStateService);
      case 'ONLY_CHANGES_NAIVE':
        return new RevertChangesNaiveDetectionService<T>(options, savePreviousStateService);
      case 'ONLY_CHANGED':
        return new RevertChangesOnlyChangedService<T>(options, savePreviousStateService);
      default:
        throw new Error(`Unsupported savePreviousStateType: ${options?.savePreviousStateType}`);
    }
  }

}
