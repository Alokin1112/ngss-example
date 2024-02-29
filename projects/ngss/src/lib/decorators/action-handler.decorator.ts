import { ActionInterface } from 'projects/ngss/src/lib/actions/actions.interface';
import 'reflect-metadata';
import { Observable } from 'rxjs';

export const ACTION_HANDLER_METADATA_KEY = "ngss-action-handler";

export type ActionHandlerTarget = <T>() => Observable<T> | void;

export const ActionHandler = <T>(action: ActionInterface<T>) => {
  return function (target: ActionHandlerTarget, propertyKey: string,) {
    Reflect.defineMetadata(ACTION_HANDLER_METADATA_KEY, action?.getType(), target, propertyKey);
  };
};