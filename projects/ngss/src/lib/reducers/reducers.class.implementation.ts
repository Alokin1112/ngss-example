import { ActionInterface } from "projects/ngss/src/lib/actions/actions.interface";
import { ACTION_HANDLER_METADATA_KEY, ACTION_HANDLER_OPTIONS_KEY, ActionHandlerContext, ActionHandlerTarget, ActionHandlerWithOptions } from "projects/ngss/src/lib/decorators/action-handler.decorator";
import { ReducerInterface } from "projects/ngss/src/lib/reducers/reducers.interface";
import { BehaviorSubject, Observable, Subscription } from "rxjs";

export abstract class StoreReducer<T> implements ReducerInterface<T> {
  abstract readonly name: string;
  readonly initialValue: T = null;
  private subscriptions: Record<string, Subscription[]> = {};

  private state$: BehaviorSubject<T>;

  constructor(initialValue: T) {
    this.initialValue = initialValue;
    this.state$ = new BehaviorSubject<T>(this.initialValue);
  }

  getState(): Observable<T> {
    return this.state$.asObservable();
  }

  getSnapshot(): T {
    return this.state$.getValue();
  }

  reset(): void {
    Object.keys(this.subscriptions).forEach((key) => {
      this.completeSubscriptions(key);
    });
    this.state$.next(this.initialValue);
  }

  handleAction<A>(action: ActionInterface<A>): void {
    const type = action?.getType();
    const actionHandlersWithOptions = this.getActionHandlers(this, type) || [];
    actionHandlersWithOptions.forEach(({ actionHandler, options }) => {
      this.subscriptions[type] = this.subscriptions[action?.getType()] || [];
      options?.completePreviousObservables && this.completeSubscriptions(type);

      const actionResult = actionHandler(this.getActionHandlerContext(), action?.getPayload());
      if (actionResult) {
        const subscription = actionResult.subscribe();
        this.subscriptions[type] = [...this.subscriptions[type], subscription];
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

  private completeSubscriptions(type: string): void {
    this.subscriptions[type]?.forEach((subscription) => !subscription.closed && subscription.unsubscribe());
    this.subscriptions[type] = [];
  }

  private getActionHandlers(instance: StoreReducer<T>, type: string): ActionHandlerWithOptions[] {
    const prototype = Object.getPrototypeOf(instance);
    const methods = Object.getOwnPropertyNames(prototype) || [];

    let actionHandlers: ActionHandlerWithOptions[] = [];
    methods?.forEach((methodName) => {
      const actionHandler = (instance as unknown as Record<string, unknown>)[methodName];
      const action = Reflect.getMetadata(ACTION_HANDLER_METADATA_KEY, instance, methodName);
      const options = Reflect.getMetadata(ACTION_HANDLER_OPTIONS_KEY, instance, methodName);

      if (typeof actionHandler === 'function' && action && action == type && actionHandler !== instance.constructor) {
        actionHandlers = [
          ...actionHandlers,
          {
            actionHandler: actionHandler as ActionHandlerTarget,
            options,
          }
        ];
      }
    });
    return actionHandlers;
  }
}