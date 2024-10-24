import { Injectable } from '@angular/core';
import { ReducerRevertOptions } from 'projects/ngss/src/lib/reducers/reducers-options.interface';
import { RevertChangesService } from 'projects/ngss/src/lib/revert-changes/revert-changes-service.interface';
import { RevertChangesAllStateService } from 'projects/ngss/src/lib/revert-changes/services/revert-changes-all-state.service';
import { RevertChangesNoneService } from 'projects/ngss/src/lib/revert-changes/services/revert-changes-none.service';

@Injectable()
export class RevertChangesFactoryService {

  private readonly NONE_REDUCER_SINGLETON = new RevertChangesNoneService<unknown>();

  get<T>(options: ReducerRevertOptions): RevertChangesService<T> {

    if (options?.maxPreviousStates <= 1 && options?.savePreviousStateType !== 'NONE') {
      throw new Error(`maxPreviousStates must be greater than 0, but it is ${options?.maxPreviousStates}`);
    }

    switch (options?.savePreviousStateType) {
      case 'NONE':
        return this.NONE_REDUCER_SINGLETON;
      case 'ALL_STATE':
        return new RevertChangesAllStateService<T>(options);
    }

    return null;
  }

}
