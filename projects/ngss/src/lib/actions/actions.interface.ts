import { ActionClass } from "projects/ngss/src/lib/actions/action.class.implementation";

export interface ActionInterface<T> {
  getType: () => string;
  getPayload: () => T;
}

export type ActionHandlerAction<T> = typeof ActionClass<T>;