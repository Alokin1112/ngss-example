import { Inject, Injectable } from "@angular/core";
import { ActionInterface } from "projects/ngss/src/lib/actions/actions.interface";
import { ReducerInterface } from "projects/ngss/src/lib/reducers/reducers.interface";
import { REDUCERS_LIST } from "projects/ngss/src/lib/reducers/reducers.token";
import { Store } from "projects/ngss/src/lib/store/store.interface";
import { Observable, combineLatest, map, merge, shareReplay } from "rxjs";

@Injectable()
export class StoreClass<S> extends Store<S> {

  private readonly state$: Observable<S>;

  constructor(
    @Inject(REDUCERS_LIST) private reducers: ReducerInterface<unknown>[]
  ) {
    super();
    this.state$ = this.prepareState(reducers);
  }

  dispatch<T>(action: ActionInterface<T>): void {
    this.reducers.forEach(reducer => {
      reducer?.handleAction(action);
    });
  }

  select<T>(callback: (state: S) => T): Observable<T> {
    return this.state$.pipe(
      map(callback),
      // shareReplay(1), Not sure if this is needed
    );
  }

  selectSnapshot<T>(callback: (state: S) => T): T {
    return null;
  }

  private prepareState(reducers: ReducerInterface<unknown>[]): Observable<S> {
    return combineLatest(reducers.map(reducer => reducer?.getState())).pipe(
      map((states: unknown[]) => {
        let state: S = {} as S;
        reducers.forEach((reducer, index) => {
          state = {
            ...state,
            [reducer?.name]: states[index]
          };
        });
        return state;
      }),
      shareReplay(1),
    );
  }

}