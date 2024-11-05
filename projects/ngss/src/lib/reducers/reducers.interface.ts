import { Signal } from "@angular/core";
import { ActionInterface } from "projects/ngss/src/lib/actions/actions.interface";
import { RevertChangesOptions } from "projects/ngss/src/lib/revert-changes/revert-changes-options.interface";
import { RevertChangesStatus } from "projects/ngss/src/lib/revert-changes/revert-changes-status.interface";
import { Observable } from "rxjs";

export interface ReducerInterface<T> {
  readonly name: string,
  readonly initialValue: T;
  getState: () => Observable<T>;
  getStateSignal: () => Signal<T>;
  getSnapshot: () => T;
  handleAction: <A>(action: ActionInterface<A>) => void;
  reset: () => void;
  revert: (options: RevertChangesOptions) => RevertChangesStatus;
}