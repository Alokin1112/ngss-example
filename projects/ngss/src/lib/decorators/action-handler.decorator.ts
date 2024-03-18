import { ActionHandlerAction } from 'projects/ngss/src/lib/actions/actions.interface';
import { ReducerInterface } from 'projects/ngss/src/lib/reducers/reducers.interface';
import 'reflect-metadata';
import { Observable } from 'rxjs';

export const ACTION_HANDLER_METADATA_KEY = "ngss-action-handler";
export const ACTION_HANDLER_OPTIONS_KEY = "ngss-action-handler-options";

export type ActionHandlerTarget = <T, K, L>(context: ActionHandlerContext<L>, payload: K) => Observable<T> | void;

export interface ActionHandlerOptions {
  completePreviousObservables: boolean;
}

export interface ActionHandlerWithOptions {
  actionHandler: ActionHandlerTarget,
  options?: ActionHandlerOptions,
}

export interface ActionHandlerContext<T> {
  getState: () => T;
  setState: (state: T) => void;
  patchState: (state: Partial<T>) => void;
}

export const ActionHandler = <T>(
  action: ActionHandlerAction<T>,
  options: ActionHandlerOptions = {
    completePreviousObservables: true,
  }
) => {
  return function (target: ReducerInterface<any>, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(ACTION_HANDLER_METADATA_KEY, action?.getType(), target, propertyKey);
    Reflect.defineMetadata(ACTION_HANDLER_OPTIONS_KEY, options, target, propertyKey);
  };
};