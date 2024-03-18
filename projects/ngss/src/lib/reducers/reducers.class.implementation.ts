import { ActionInterface } from "projects/ngss/src/lib/actions/actions.interface";
import { ACTION_HANDLER_METADATA_KEY, ActionHandlerContext, ActionHandlerTarget } from "projects/ngss/src/lib/decorators/action-handler.decorator";
import { ReducerInterface } from "projects/ngss/src/lib/reducers/reducers.interface";
import { BehaviorSubject, Observable, take } from "rxjs";

export abstract class StoreReducer<T> implements ReducerInterface<T> {
  abstract readonly name: string;
  readonly initialValue: T = null;

  private state$: BehaviorSubject<T>;

  constructor(initialValue: T) {
    this.initialValue = initialValue;
    this.state$ = new BehaviorSubject<T>(this.initialValue);
  }

  getState(): Observable<T> {
    return this.state$.asObservable();
  }

  reset(): void {
    this.state$.next(this.initialValue);
  }

  handleAction<A>(action: ActionInterface<A>): void {
    const actionHandlers = this.getActionHandlers(this, action?.getType()) || [];
    console.log(actionHandlers);
    actionHandlers.forEach((actionItem) => {
      const actionResult = actionItem(this.getActionHandlerContext(), action?.getPayload());
      if (actionResult) {
        actionResult.pipe(take(1)).subscribe();
      }
    });
  }


  private getActionHandlerContext(): ActionHandlerContext<T> {
    return {
      getState: () => this.state$.getValue(),
      setState: (state: T) => this.state$.next(state),
      patchState: (state: Partial<T>) => this.state$.next({ ...this.state$.getValue(), ...state }),
    };
  }


  private getActionHandlers(instance: StoreReducer<T>, type: string): ActionHandlerTarget[] {
    const prototype = Object.getPrototypeOf(instance);
    const methods = Object.getOwnPropertyNames(prototype) || [];

    let actionHandlers: ActionHandlerTarget[] = [];
    methods?.forEach((methodName) => {
      const method = (instance as unknown as Record<string, unknown>)[methodName];
      const action = Reflect.getMetadata(ACTION_HANDLER_METADATA_KEY, instance, methodName);

      if (typeof method === 'function' && action && action == type && method !== instance.constructor) {
        actionHandlers = [...actionHandlers, method as ActionHandlerTarget];
      }
    });
    return actionHandlers;
  }
}