import { Signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ReducerInterface } from "projects/ngss/src/lib/reducers/reducers.interface";
import { StoreAdditionalConfig } from "projects/ngss/src/lib/store/store-additional-config.interface";
import { Store } from "projects/ngss/src/lib/store/store.interface";
import { combineLatest, map, Observable, shareReplay } from "rxjs";

export class StoreClass<S> extends Store {

  private readonly state$: Observable<S>;

  constructor(
    protected override reducers: ReducerInterface<unknown>[],
    protected override config: StoreAdditionalConfig
  ) {
    super(reducers, config);
    this.state$ = this.prepareState(this.reducers);
  }

  select<T>(callback: (state: S) => T): Observable<T> {
    return this.state$.pipe(
      map(callback),
    );
  }

  selectSignal<T>(callback: (state: any) => T): Signal<T> {
    return toSignal(this.select(callback), { injector: this.injector });
  }

  selectSnapshot<T>(callback: (state: S) => T): T {
    let state = {};
    this.reducers.forEach((reducer) => {
      state = {
        ...state,
        [reducer?.name]: reducer?.getSnapshot()
      };
    });

    return callback(state as S);
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