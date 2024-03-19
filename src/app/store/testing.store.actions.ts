import { ActionClass } from "ngss";

export class AddNumber extends ActionClass<number> {
  override readonly type = "AddNumber";
}

export class RemoveNumber extends ActionClass<number> {
  override readonly type = "RemoveNumber";
}

export class IntervalAdding extends ActionClass<number> {
  override readonly type = "IntervalAdding";
}

export class ClearNumber extends ActionClass<void> { }