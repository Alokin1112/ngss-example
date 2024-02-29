import { ActionInterface } from "ngss";
import { ACTION_HANDLER_METADATA_KEY, ActionHandlerTarget } from "projects/ngss/src/lib/decorators/action-handler.decorator";
import { ReducerInterface } from "projects/ngss/src/lib/reducers/reducers.interface";
import { BehaviorSubject, Observable } from "rxjs";


export abstract class StoreReducer<T> implements ReducerInterface<T> {
  readonly name: string;
  readonly initialValue: T;

  private state$: BehaviorSubject<T>;

  constructor() {
    this.state$ = new BehaviorSubject<T>(this.initialValue);
  }

  getState(): Observable<T> {
    return this.state$.asObservable();
  }

  reset(): void {
    this.state$.next(this.initialValue);
  }

  handleAction<A>(action: ActionInterface<A>): void {
    const actionHandler = this.getActionHandlers(this, action?.getType());

  }

  private handleSingleAction

  private getActionHandlers(instance: StoreReducer<T>, type: string): ActionHandlerTarget[] {
    const prototype = Object.getPrototypeOf(instance);
    const methods = Object.getOwnPropertyNames(prototype) || [];

    let actionHandlers: ActionHandlerTarget[] = [];
    methods?.forEach((methodName) => {
      const method = instance[methodName];
      const action = Reflect.getMetadata(ACTION_HANDLER_METADATA_KEY, instance, methodName);

      if (typeof method === 'function' && action && action == type && method !== instance.constructor) {
        actionHandlers = [...actionHandlers, method as ActionHandlerTarget]
      }
    })
    return actionHandlers;
  }
}