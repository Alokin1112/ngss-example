import { ActionHandlerAction } from 'projects/ngss/src/lib/actions/actions.interface';
import { ReducerInterface } from 'projects/ngss/src/lib/reducers/reducers.interface';
import 'reflect-metadata';
import { Observable } from 'rxjs';

export const ACTION_HANDLER_METADATA_KEY = "ngss-action-handler";

export type ActionHandlerTarget = <T, K, L>(context: ActionHandlerContext<L>, payload: K) => Observable<T> | void;

export interface ActionHandlerContext<T> {
  getState: () => T;
  setState: (state: T) => void;
  patchState: (state: Partial<T>) => void;
}

export const ActionHandler = <T>(
  action: ActionHandlerAction<T>
) => {
  return function (target: ReducerInterface<any>, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(ACTION_HANDLER_METADATA_KEY, action?.getType(), target, propertyKey);
  };
};