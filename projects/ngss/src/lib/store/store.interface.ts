import { ActionInterface } from "projects/ngss/src/lib/actions/actions.interface";
import { Observable } from "rxjs";

export interface Store<S> {
  dispatch: <T>(action: ActionInterface<T>) => void;
  select: <T>(callback: (state: S) => T) => Observable<T>;
  selectSnapshot: <T>(callback: (state: S) => T) => T;
}