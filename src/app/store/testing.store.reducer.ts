import { Injectable } from "@angular/core";
import { AddNumber, IntervalAdding, RemoveNumber } from "@app/store/testing.store.actions";
import { ActionHandler, ActionHandlerContext, StoreSignalReducer } from "ngss";
import { Observable, interval, map, of } from "rxjs";

export interface TestState {
  value: number;
}

const initialState: TestState = {
  value: 0,
};

@Injectable({ providedIn: 'root' })
export class TestReducer extends StoreSignalReducer<TestState> {
  readonly name = "test";
  constructor() {
    super(initialState);
  }

  @ActionHandler(AddNumber)
  addNumber(context: ActionHandlerContext<TestState>, payload: number): void {
    context.patchState({
      value: context.getState().value + payload
    });
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