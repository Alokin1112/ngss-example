import { ActionClass } from "ngss";

export class AddNumber extends ActionClass<number> {
  protected readonly type = "AddNumber";
}