import { ActionInterface } from 'projects/ngss/src/lib/actions/actions.interface';
import { RevertChangesOptions } from "projects/ngss/src/lib/revert-changes/revert-changes-options.interface";
import { RevertChangesService } from 'projects/ngss/src/lib/revert-changes/revert-changes-service.interface';
import { RevertChangesStatus } from 'projects/ngss/src/public-api';

export class RevertChangesNoneService<T> implements RevertChangesService<T> {

  saveInitialState(state: T): void {
    return;
  }

  saveChanges<A>(newState: T, handledAction: ActionInterface<A>): void {
    return;
  }

  revertChanges(options: RevertChangesOptions): RevertChangesStatus {
    throw new Error("Passed reducer does not support reverting changes");
  }

}
