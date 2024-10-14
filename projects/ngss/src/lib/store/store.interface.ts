import { inject, Injectable, Injector, Signal } from "@angular/core";
import { ActionInterface } from "projects/ngss/src/lib/actions/actions.interface";
import { ActionHandlerWithOptions } from "projects/ngss/src/lib/decorators/action-handler.decorator";
import { Middleware, MiddlewareContext } from "projects/ngss/src/lib/middleware/middleware.interface";
import { getAllReducerActionHandlers } from "projects/ngss/src/lib/reducers/reducers-action-handlers-getter.const";
import { ReducerInterface } from "projects/ngss/src/lib/reducers/reducers.interface";
import { StoreAdditionalConfig } from "projects/ngss/src/lib/store/store-additional-config.interface";
import { Observable } from "rxjs";

@Injectable()
export abstract class Store {

  protected readonly middlewares: Middleware<unknown>[];
  protected readonly injector = inject(Injector);
  protected readonly actionReducers: Map<string, ReducerInterface<unknown>[]>;

  constructor(
    protected reducers: ReducerInterface<unknown>[],
    protected config: StoreAdditionalConfig
  ) {
    this.middlewares = this.config?.middlewares || [];
    this.actionReducers = this.getActionReducers(this.reducers);
  }

  abstract select<T>(callback: (state: any) => T): Observable<T>;
  abstract selectSignal<T>(callback: (state: any) => T): Signal<T>;
  abstract selectSnapshot<T>(callback: (state: any) => T): T;

  dispatch<T>(action: ActionInterface<T>): void {
    this.middlewares?.length ?
      this.handleMiddlewares(action) :
      this.actionDispatcher(action);
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

  protected handleMiddlewares(action: ActionInterface<unknown>): void {
    const context: MiddlewareContext<unknown> = {
      getState: () => this.selectSnapshot<unknown>(state => state)
    };
    const middlewaresWithContext = this.middlewares.map(middleware => middleware(context));

    const firstAction = middlewaresWithContext.reduceRight((next, middleware) => middleware(next), (action: ActionInterface<unknown>) => this.actionDispatcher(action));
    firstAction(action);
  }

  protected actionDispatcher = (action: ActionInterface<unknown>): void => {
    const actionReducers = this.actionReducers.get(action?.getType());
    actionReducers.forEach(reducer => {
      reducer?.handleAction(action);
    });
  };

  private getActionReducers(reducers: ReducerInterface<unknown>[]): Map<string, ReducerInterface<unknown>[]> {
    const map = new Map<string, ReducerInterface<unknown>[]>();

    (reducers || []).forEach((reducer) => {
      this.addAllActionsToMap(map, reducer);
    });
    return map;
  }

  private addAllActionsToMap(map: Map<string, ReducerInterface<unknown>[]>, reducer: ReducerInterface<unknown>): void {
    const declaredActions = getAllReducerActionHandlers(reducer);
    (declaredActions || []).forEach((action) => {
      if (!map.has(action.type)) {
        map.set(action.type, [reducer]);
      } else {
        const declaredReducers = map.get(action.type);
        if (!declaredReducers.some(declaredReducer => declaredReducer.name === reducer.name)) {
          map.get(action.type).push(reducer);
        }
      }
    });
  }

}