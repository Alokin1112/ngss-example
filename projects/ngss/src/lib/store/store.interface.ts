import { Injectable } from "@angular/core";
import { ActionInterface } from "projects/ngss/src/lib/actions/actions.interface";
import { Observable } from "rxjs";

@Injectable()
export abstract class Store {
  abstract dispatch<T>(action: ActionInterface<T>): void;
  abstract select<T>(callback: (state: any) => T): Observable<T>;
  abstract selectOnce<T>(callback: (state: any) => T): Observable<T>;
  abstract reset(storeName?: string | string[]): void;
}