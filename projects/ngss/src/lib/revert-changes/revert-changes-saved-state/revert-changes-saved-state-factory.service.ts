import { Injectable } from '@angular/core';
import { RevertChangesSavedStateRawService } from 'projects/ngss/src/lib/revert-changes/revert-changes-saved-state/revert-changes-saved-state-raw.service';
import { RevertChangesSavedStateService, RevertChangesStateType } from 'projects/ngss/src/lib/revert-changes/revert-changes-service.interface';

@Injectable()
export class RevertChangesSavedStateFactoryService {


  get<T>(type: RevertChangesStateType): RevertChangesSavedStateService<T> {
    switch (type) {
      case 'RAW':
        return new RevertChangesSavedStateRawService<T>();
      default:
        throw new Error(`Unknown type of revert changes saved state: ${type}`);
    }
  }

}
