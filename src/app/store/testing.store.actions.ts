import { ActionClass } from "ngss";

export class AddNumber extends ActionClass<number> {
  protected readonly type = "AddNumber";
}

export class RemoveNumber extends ActionClass<number> {
  protected readonly type = "RemoveNumber";
}