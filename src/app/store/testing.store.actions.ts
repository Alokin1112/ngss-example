import { ActionClass } from "ngss";

export class AddNumber extends ActionClass<number> {
  protected readonly type = "AddNumber";
}

export class RemoveNumber extends ActionClass<number> {
  protected readonly type = "RemoveNumber";
}

export class IntervalAdding extends ActionClass<number> {
  protected readonly type = "IntervalAdding";
}