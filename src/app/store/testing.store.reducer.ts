import { Injectable } from "@angular/core";
import { AddNumber, IntervalAdding, RemoveNumber } from "@app/store/testing.store.actions";
import { ActionHandler, ActionHandlerContext, StoreReducer } from "ngss";
import { Observable, interval, map, of } from "rxjs";

export interface TestState {
  value: number;
  age: number;
  city: string
  male: boolean;
  friends: { name: string; age: number; city: string }[];
}

const initialState: TestState = {
  value: 0,
  age: 30,
  city: "New York",
  male: true,
  friends: [
    { name: "Jane Doe", age: 28, city: "Los Angeles" },
    { name: "Alice", age: 25, city: "Chicago" }
  ]
};

@Injectable({ providedIn: 'root' })
export class TestReducer extends StoreReducer<TestState> {
  readonly name = "test";
  constructor() {
    super(initialState, { revert: { savePreviousStateType: 'ONLY_CHANGED_STRING', maxPreviousStates: 5, savePreviousStateSaveType: "RAW" } });
  }

  @ActionHandler(AddNumber)
  addNumber(context: ActionHandlerContext<TestState>, payload: number): void {
    // console.timeEnd("fromInitToFind");
    context.patchState({
      value: context.getState().value + payload,
    });

    // console.timeEnd("fromInitToFinish");
  }

  @ActionHandler(RemoveNumber)
  removeNumber(context: ActionHandlerContext<TestState>, payload: number): Observable<unknown> {
    return of(payload).pipe(
      map((value) => {
        context.patchState({
          value: context.getState().value - payload
        });
      }));
  }

  @ActionHandler(IntervalAdding)
  intervalAdding(context: ActionHandlerContext<TestState>, payload: number): Observable<unknown> {
    return interval(1000).pipe(
      map((value) => {
        context.patchState({
          value: context.getState().value + payload
        });
      }));
  }
}