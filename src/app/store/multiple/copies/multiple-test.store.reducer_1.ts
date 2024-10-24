import { Injectable } from "@angular/core";
import { ActionClass, ActionHandler, ActionHandlerContext, StoreSignalReducer } from "ngss";
import { Observable, interval, map, of } from "rxjs";

export interface TestState1 {
  value: number;
  secondValue:number,
  stringValue:string,
}

const initialState: TestState1 = {
  value: 0,
  secondValue: 0,
  stringValue: "",
};

export class AddNumber1 extends ActionClass<number> {
  override readonly type = "AddNumber1";
}

export class RemoveNumber1 extends ActionClass<number> {
  override readonly type = "RemoveNumber1";
}

export class IntervalAdding1 extends ActionClass<number> {
  override readonly type = "IntervalAdding1";
}

export class ClearNumber1 extends ActionClass<void> { }

@Injectable({ providedIn: 'root' })
export class MultipleReducer1 extends StoreSignalReducer<TestState1> {
  readonly name = "test1";

  constructor() {
    super(initialState);
  }

  @ActionHandler(AddNumber1)
  addNumber(context: ActionHandlerContext<TestState1>, payload: number): void {
    context.patchState({
      value: context.getState().value + payload
    });
  }

  @ActionHandler(RemoveNumber1)
  removeNumber(context: ActionHandlerContext<TestState1>, payload: number): Observable<unknown> {
    return of(payload).pipe(
      map((value) => {
        context.patchState({
          value: context.getState().value - payload
        });
      }));
  }

  @ActionHandler(IntervalAdding1)
  intervalAdding(context: ActionHandlerContext<TestState1>, payload: number): Observable<unknown> {
    return interval(1000).pipe(
      map((value) => {
        context.patchState({
          value: context.getState().value + payload
        });
      }));
  }
}