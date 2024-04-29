import { computed, inject, Injector, signal, Signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { ActionInterface } from "projects/ngss/src/lib/actions/actions.interface";
import { Middleware, MiddlewareContext } from "projects/ngss/src/lib/middleware/middleware.interface";
import { ReducerInterface } from "projects/ngss/src/lib/reducers/reducers.interface";
import { StoreAdditionalConfig } from "projects/ngss/src/lib/store/store-additional-config.interface";
import { Store } from "projects/ngss/src/lib/store/store.interface";
import { map, Observable } from "rxjs";

export class StoreSignal<S> extends Store {

  private readonly state$: Signal<S>;
  private readonly middlewares: Middleware<unknown>[];
  private readonly injector = inject(Injector);

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
    return toObservable(this.state$, { injector: this.injector }).pipe(
      map(callback),
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

  private prepareState(reducers: ReducerInterface<unknown>[]): Signal<S> {
    const state: { name: string, val: Signal<unknown> }[] = reducers.map((reducer) => ({
      name: reducer?.name,
      val: reducer.getStateSignal(),
    }));
    const stateSignal = signal(state)
    return computed(() => stateSignal().reduce((acc, curr) => ({ ...acc, [curr.name]: curr.val() }), {} as S));
  }
}