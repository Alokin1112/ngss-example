import { ActionInterface } from "ngss";

export abstract class ActionClass<T> implements ActionInterface<T> {

  protected abstract readonly type: string;

  constructor(public payload?: T) { }

  getType(): string {
    return this.type;
  }

  getPayload(): T {
    return this?.payload;
  }
}