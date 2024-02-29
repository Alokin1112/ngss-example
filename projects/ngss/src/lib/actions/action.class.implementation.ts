import { ActionInterface } from "projects/ngss/src/lib/actions/actions.interface";


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