import { Injectable } from '@angular/core';
import { ReducerRevertOptions } from 'projects/ngss/src/lib/reducers/reducers-options.interface';
import { RevertChangesSavedStateFactoryService } from 'projects/ngss/src/lib/revert-changes/revert-changes-saved-state/revert-changes-saved-state-factory.service';
import { RevertChangesService } from 'projects/ngss/src/lib/revert-changes/revert-changes-service.interface';
import { RevertChangesAllStateService } from 'projects/ngss/src/lib/revert-changes/services/revert-changes-all-state.service';
import { RevertChangesNaiveDetectionService } from 'projects/ngss/src/lib/revert-changes/services/revert-changes-naive-detection.service';
import { RevertChangesNoneService } from 'projects/ngss/src/lib/revert-changes/services/revert-changes-none.service';
import { RevertChangesOnlyChangedStringService } from 'projects/ngss/src/lib/revert-changes/services/revert-changes-only-changed-string.service';
import { RevertChangesOnlyChangedService } from 'projects/ngss/src/lib/revert-changes/services/revert-changes-only-changed.service';
import { WebAssemblyService } from 'projects/ngss/src/lib/web-assembly/web-assembly.service';

@Injectable()
export class RevertChangesFactoryService {

  private readonly NONE_REDUCER_SINGLETON = new RevertChangesNoneService<unknown>();

  constructor(
    private revertChangesSavedStateFactoryService: RevertChangesSavedStateFactoryService,
    private wasmService: WebAssemblyService,
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
      case 'ONLY_CHANGED_STRING':
        return new RevertChangesOnlyChangedStringService<T>(options, savePreviousStateService, this.wasmService);
      default:
        throw new Error(`Unsupported savePreviousStateType: ${options?.savePreviousStateType}`);
    }
  }

}
