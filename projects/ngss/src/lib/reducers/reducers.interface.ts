import { Signal } from "@angular/core";
import { ActionInterface } from "projects/ngss/src/lib/actions/actions.interface";
import { Observable } from "rxjs";

export interface ReducerInterface<T> {
  readonly name: string,
  readonly initialValue: T;
  getState: () => Observable<T>;
  getStateSignal: () => Signal<T>;
  getSnapshot: () => T;
  handleAction: <A>(action: ActionInterface<A>) => void;
  reset: () => void;
}