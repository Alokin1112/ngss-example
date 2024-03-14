import { ActionInterface } from 'projects/ngss/src/lib/actions/actions.interface';
import 'reflect-metadata';
import { Observable } from 'rxjs';

export const ACTION_HANDLER_METADATA_KEY = "ngss-action-handler";

export type ActionHandlerTarget = <T, K, L>(context: ActionHandlerContext<L>, payload: K) => Observable<T> | void;

export interface ActionHandlerContext<T> {
  getState: () => T;
  setState: (state: T) => void;
  patchState: (state: Partial<T>) => void;
}

export const ActionHandler = <T>(action: ActionInterface<T>) => {
  return function (target: ActionHandlerTarget, propertyKey: string,) {
    Reflect.defineMetadata(ACTION_HANDLER_METADATA_KEY, action?.getType(), target, propertyKey);
  };
};