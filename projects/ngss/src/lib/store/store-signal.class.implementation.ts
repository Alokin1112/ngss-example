import { computed, signal, Signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { ReducerInterface } from "projects/ngss/src/lib/reducers/reducers.interface";
import { StoreAdditionalConfig } from "projects/ngss/src/lib/store/store-additional-config.interface";
import { Store } from "projects/ngss/src/lib/store/store.interface";
import { map, merge, Observable, of } from "rxjs";

export class StoreSignal<S> extends Store {

  private readonly state$: Signal<S>;

  constructor(
    protected override reducers: ReducerInterface<unknown>[],
    protected override config: StoreAdditionalConfig
  ) {
    super(reducers, config);
    this.state$ = this.prepareState(this.reducers);
  }

  select<T>(callback: (state: S) => T): Observable<T> {
    const stateAsObservable$ = toObservable(this.state$, { injector: this.injector });
    return merge(of(this.state$()), stateAsObservable$).pipe(
      map((state) => callback(state))
    );
  }

  selectSignal<T>(callback: (state: any) => T): Signal<T> {
    return computed(() => callback(this.state$()));
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

  private prepareState(reducers: ReducerInterface<unknown>[]): Signal<S> {
    const state: { name: string, val: Signal<unknown> }[] = reducers.map((reducer) => ({
      name: reducer?.name,
      val: reducer.getStateSignal(),
    }));
    const stateSignal = signal(state);
    return computed(() => stateSignal().reduce((acc, curr) => ({ ...acc, [curr.name]: curr.val() }), {} as S));
  }
}