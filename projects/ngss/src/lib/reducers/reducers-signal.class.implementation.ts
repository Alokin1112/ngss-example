import { inject, Injector, signal, Signal, WritableSignal } from "@angular/core";
import { toObservable } from '@angular/core/rxjs-interop';
import { ActionInterface } from "projects/ngss/src/lib/actions/actions.interface";
import { ActionHandlerContext, ActionHandlerTarget, ActionHandlerWithOptions } from "projects/ngss/src/lib/decorators/action-handler.decorator";
import { getAllReducerActionHandlers } from "projects/ngss/src/lib/reducers/reducers-action-handlers-getter.const";
import { ReducersSubscriptionHandlerService } from "projects/ngss/src/lib/reducers/reducers-subscription-handler.service";
import { ReducerInterface } from "projects/ngss/src/lib/reducers/reducers.interface";
import { isObservable, merge, Observable, of } from "rxjs";

export abstract class StoreSignalReducer<T> implements ReducerInterface<T> {
  abstract readonly name: string;
  readonly initialValue: T = null;

  protected readonly actionsMap: Map<string, ActionHandlerWithOptions[]>;
  private readonly reducersSubscriptionHandlerService = inject(ReducersSubscriptionHandlerService);
  private readonly injector = inject(Injector);

  private state$: WritableSignal<T>;

  constructor(initialValue: T) {
    this.initialValue = initialValue;
    this.state$ = signal(this.initialValue);
    this.actionsMap = this.getActionReducers();
  }

  getState(): Observable<T> {
    const stateAsObservable$ = toObservable(this.state$, { injector: this.injector });
    return merge(of(this.state$()), stateAsObservable$);
  }

  getStateSignal(): Signal<T> {
    return this.state$;
  }

  getSnapshot(): T {
    return this.state$();
  }

  reset(): void {
    this.reducersSubscriptionHandlerService.completeAllSubscriptions();
    this.state$.set(this.initialValue);
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
      getState: () => this.state$(),
      setState: (state: T) => this.state$.set(state),
      patchState: (state: Partial<T>) => this.state$.set({ ...this.state$(), ...state }),
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