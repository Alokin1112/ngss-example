import { Injectable } from "@angular/core";
import { ActionInterface } from "projects/ngss/src/lib/actions/actions.interface";
import { Observable } from "rxjs";

@Injectable()
export abstract class Store<S> {
  abstract dispatch<T>(action: ActionInterface<T>): void;
  abstract select<T>(callback: (state: S) => T): Observable<T>;
  abstract selectSnapshot<T>(callback: (state: S) => T): T;
}