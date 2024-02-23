export interface ActionInterface<T> {
  getType: () => string;
  getPayload: () => T;
}