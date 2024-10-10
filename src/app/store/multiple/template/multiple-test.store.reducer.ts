import { Injectable } from "@angular/core";
import { ActionClass, ActionHandler, ActionHandlerContext, StoreSignalReducer } from "ngss";
import { Observable, interval, map, of } from "rxjs";

export interface TestState{Param} {
  value: number;
  secondValue:number,
  stringValue:string,
}

const initialState: TestState{Param} = {
  value: 0,
  secondValue: 0,
  stringValue: "",
};

export class AddNumber{Param} extends ActionClass<number> {
  override readonly type = "AddNumber{Param}";
}

export class RemoveNumber{Param} extends ActionClass<number> {
  override readonly type = "RemoveNumber{Param}";
}

export class IntervalAdding{Param} extends ActionClass<number> {
  override readonly type = "IntervalAdding{Param}";
}

export class ClearNumber{Param} extends ActionClass<void> { }

@Injectable({ providedIn: 'root' })
export class MultipleReducer{Param} extends StoreSignalReducer<TestState{Param}> {
  readonly name = "test{Param}";

  constructor() {
    super(initialState);
  }

  @ActionHandler(AddNumber{Param})
  addNumber(context: ActionHandlerContext<TestState{Param}>, payload: number): void {
    context.patchState({
      value: context.getState().value + payload
    });
  }

  @ActionHandler(RemoveNumber{Param})
  removeNumber(context: ActionHandlerContext<TestState{Param}>, payload: number): Observable<unknown> {
    return of(payload).pipe(
      map((value) => {
        context.patchState({
          value: context.getState().value - payload
        });
      }));
  }

  @ActionHandler(IntervalAdding{Param})
  intervalAdding(context: ActionHandlerContext<TestState{Param}>, payload: number): Observable<unknown> {
    return interval(1000).pipe(
      map((value) => {
        context.patchState({
          value: context.getState().value + payload
        });
      }));
  }
}