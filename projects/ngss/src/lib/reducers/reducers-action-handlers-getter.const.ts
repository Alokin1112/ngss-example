import { ACTION_HANDLER_METADATA_KEY, ACTION_HANDLER_OPTIONS_KEY, ActionHandlerWithOptions } from "projects/ngss/src/lib/decorators/action-handler.decorator";
import { ReducerInterface } from "projects/ngss/src/lib/reducers/reducers.interface";

export function getReducerActionHandlers<S, T extends ReducerInterface<S>>(instance: T, type: string): ActionHandlerWithOptions[] {
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
          actionHandler: methodName,
          options,
        }
      ];
    }
  });
  return actionHandlers;
}