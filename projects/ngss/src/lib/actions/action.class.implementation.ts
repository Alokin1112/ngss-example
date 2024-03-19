import { ActionInterface } from "projects/ngss/src/lib/actions/actions.interface";


export class ActionClass<T> implements ActionInterface<T> {

  readonly type: string;

  constructor(public payload?: T) { }

  getType(): string {
    return this.type || this.constructor.name;
  }

  getPayload(): T | undefined {
    return this?.payload;
  }
}