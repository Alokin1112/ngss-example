import { inject, Injector, signal, Signal, WritableSignal } from "@angular/core";
import { toObservable } from '@angular/core/rxjs-interop';
import { ActionInterface } from "projects/ngss/src/lib/actions/actions.interface";
import { ActionHandlerContext, ActionHandlerTarget, ActionHandlerWithOptions } from "projects/ngss/src/lib/decorators/action-handler.decorator";
import { getAllReducerActionHandlers } from "projects/ngss/src/lib/reducers/reducers-action-handlers-getter.const";
import { DEFAULT_REDUCER_OPTIONS, ReducerOptions } from "projects/ngss/src/lib/reducers/reducers-options.interface";
import { ReducersSubscriptionHandlerService } from "projects/ngss/src/lib/reducers/reducers-subscription-handler.service";
import { ReducerInterface } from "projects/ngss/src/lib/reducers/reducers.interface";
import { RevertChangesOptions } from "projects/ngss/src/lib/revert-changes/revert-changes-options.interface";
import { RevertChangesService } from "projects/ngss/src/lib/revert-changes/revert-changes-service.interface";
import { RevertChangesStatus } from "projects/ngss/src/lib/revert-changes/revert-changes-status.interface";
import { RevertChangesFactoryService } from "projects/ngss/src/lib/revert-changes/services/revert-changes-factory.service";
import { isObservable, merge, Observable, of } from "rxjs";

export abstract class StoreSignalReducer<T> implements ReducerInterface<T> {
  abstract readonly name: string;
  readonly initialValue: T = null;

  protected readonly actionsMap: Map<string, ActionHandlerWithOptions[]>;
  private readonly revertChangesService: RevertChangesService<T>;
  private readonly reducersSubscriptionHandlerService = inject(ReducersSubscriptionHandlerService);
  private readonly injector = inject(Injector);

  private state$: WritableSignal<T>;

  constructor(initialValue: T, options: Partial<ReducerOptions> = {}) {
    this.initialValue = initialValue;
    this.state$ = signal(this.initialValue);
    this.actionsMap = this.getActionReducers();

    const fullOptions: ReducerOptions = {
      ...DEFAULT_REDUCER_OPTIONS,
      ...(options || {}),
    };

    this.revertChangesService = inject(RevertChangesFactoryService).get<T>(fullOptions?.revert);
    this.revertChangesService.saveInitialState(this.initialValue);
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

      const actionResult = (this as unknown as Record<string, ActionHandlerTarget>)?.[actionHandler](this.getActionHandlerContext(action), action?.getPayload());
      if (actionResult && isObservable(actionResult)) {
        const subscription = actionResult.subscribe();
        this.reducersSubscriptionHandlerService.addSubscription(type, subscription);
      }
    });
  }

  revert(options: RevertChangesOptions): RevertChangesStatus {
    return this.revertChangesService.revertChanges(options, (state: T) => this.state$.set(state));
  }

  private getActionHandlerContext(action: ActionInterface<unknown>): ActionHandlerContext<T> {
    return {
      getState: () => this.state$(),
      setState: (state: T) => {
        this.state$.set(state);
        this.revertChangesService.saveChanges(state, action);
      },
      patchState: (stateChanges: Partial<T>) => {
        const newState: T = { ...this.state$(), ...stateChanges };
        this.state$.set(newState);
        this.revertChangesService.saveChanges(newState, action, stateChanges);
      },
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