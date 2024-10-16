import { inject, Injector, Signal } from "@angular/core";
import { toSignal } from '@angular/core/rxjs-interop';
import { ActionInterface } from "projects/ngss/src/lib/actions/actions.interface";
import { ActionHandlerContext, ActionHandlerTarget, ActionHandlerWithOptions } from "projects/ngss/src/lib/decorators/action-handler.decorator";
import { getAllReducerActionHandlers } from "projects/ngss/src/lib/reducers/reducers-action-handlers-getter.const";
import { ReducersSubscriptionHandlerService } from "projects/ngss/src/lib/reducers/reducers-subscription-handler.service";
import { ReducerInterface } from "projects/ngss/src/lib/reducers/reducers.interface";
import { BehaviorSubject, isObservable, Observable } from "rxjs";

export abstract class StoreReducer<T> implements ReducerInterface<T> {
  abstract readonly name: string;
  readonly initialValue: T = null;
  protected readonly actionsMap: Map<string, ActionHandlerWithOptions[]>;

  private readonly injector = inject(Injector);
  private readonly reducersSubscriptionHandlerService = inject(ReducersSubscriptionHandlerService);

  private state$: BehaviorSubject<T>;

  constructor(initialValue: T) {
    this.initialValue = initialValue;
    this.state$ = new BehaviorSubject<T>(this.initialValue);
    this.actionsMap = this.getActionReducers();
  }

  getState(): Observable<T> {
    return this.state$.asObservable();
  }

  getStateSignal(): Signal<T> {
    return toSignal(this.state$.asObservable(), { injector: this.injector });
  }

  getSnapshot(): T {
    return this.state$.getValue();
  }

  reset(): void {
    this.reducersSubscriptionHandlerService.completeAllSubscriptions();
    this.state$.next(this.initialValue);
  }

  handleAction<A>(action: ActionInterface<A>): void {
    const type = action?.getType();
    const actionHandlersWithOptions = this.actionsMap.get(type) || [];
    actionHandlersWithOptions.forEach(({ actionHandler, options }) => {
      options?.completePreviousObservables && this.reducersSubscriptionHandlerService.completeSubscriptions(type);

      const actionResult = (this as unknown as Record<string, ActionHandlerTarget>)?.[actionHandler](this.getActionHandlerContext(), action?.getPayload());
      if (actionResult && isObservable(actionResult)) {
        const subscription = actionResult.subscribe();
        this.reducersSubscriptionHandlerService.addSubscription(type, subscription);
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

  private getActionReducers(): Map<string, ActionHandlerWithOptions[]> {
    const actions = getAllReducerActionHandlers(this);
    const map = new Map<string, ActionHandlerWithOptions[]>();

    (actions || []).forEach((actionHandler) => {
      const type = actionHandler.type;
      if (!map.has(type)) {
        map.set(type, []);
      }
      map.get(type).push(actionHandler);
    });
    return map;
  }

}