import { ActionInterface } from "projects/ngss/src/lib/actions/actions.interface";
import { Middleware, MiddlewareContext } from "projects/ngss/src/lib/middleware/middleware.interface";
import { ReducerInterface } from "projects/ngss/src/lib/reducers/reducers.interface";
import { StoreAdditionalConfig } from "projects/ngss/src/lib/store/store-additional-config.interface";
import { Store } from "projects/ngss/src/lib/store/store.interface";
import { Observable, combineLatest, map, shareReplay } from "rxjs";

export class StoreClass<S> extends Store {

  private readonly state$: Observable<S>;
  private readonly middlewares: Middleware<unknown>[];

  constructor(
    private reducers: ReducerInterface<unknown>[],
    private config: StoreAdditionalConfig
  ) {
    super();
    this.state$ = this.prepareState(this.reducers);
    this.middlewares = this.config?.middlewares || [];
  }

  dispatch<T>(action: ActionInterface<T>): void {
    this.middlewares?.length ?
      this.handleMiddlewares(action) :
      this.actionDispatcher(action);
  }

  select<T>(callback: (state: S) => T): Observable<T> {
    return this.state$.pipe(
      map(callback),
    );
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

  private handleMiddlewares(action: ActionInterface<unknown>): void {
    const context: MiddlewareContext<unknown> = {
      getState: () => this.selectSnapshot(state => state)
    };
    const middlewaresWithContext = this.middlewares.map(middleware => middleware(context));

    const firstAction = middlewaresWithContext.reduceRight((next, middleware) => middleware(next), this.actionDispatcher);
    firstAction(action);
  }

  private actionDispatcher = (action: ActionInterface<unknown>): void => {
    this.reducers.forEach(reducer => {
      reducer?.handleAction(action);
    });
  };

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