export interface ActionInterface<T> {
  getType: () => string;
  getPayload: () => T;
}

export declare type ActionHandlerAction<T> = ActionInterface<T>;