import { ActionInterface } from "projects/ngss/src/lib/actions/actions.interface";
import { ReducerInterface } from "projects/ngss/src/lib/reducers/reducers.interface";
import { Store } from "projects/ngss/src/lib/store/store.interface";
import { Observable, combineLatest, map, shareReplay, take } from "rxjs";

export class StoreClass<S> extends Store {

  private readonly state$: Observable<S>;

  constructor(
    private reducers: ReducerInterface<unknown>[]
  ) {
    super();
    this.state$ = this.prepareState(this.reducers);
  }

  dispatch<T>(action: ActionInterface<T>): void {
    this.reducers.forEach(reducer => {
      reducer?.handleAction(action);
    });
  }

  select<T>(callback: (state: S) => T): Observable<T> {
    return this.state$.pipe(
      map(callback),
    );
  }

  selectOnce<T>(callback: (state: S) => T): Observable<T> {
    return this.select(callback).pipe(take(1));
  }

  reset(storeName: string | string[] = null): void {
    if (!storeName) {
      this.reducers.forEach(reducer => {
        reducer?.reset();
      });
    }
    if (!Array.isArray(storeName))
      storeName = [storeName];

    this.reducers.forEach(reducer => {
      if (storeName.includes(reducer?.name))
        reducer?.reset();
    });
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