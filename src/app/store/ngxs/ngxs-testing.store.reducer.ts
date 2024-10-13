import { Injectable } from "@angular/core";
import { NgxsAddNumber, NgxsClearNumber, NgxsIntervalAdding, NgxsRemoveNumber } from "@app/store/ngxs/ngxs-testing.store.actions";
import { Action, State, StateContext } from "@ngxs/store";
import { Observable, interval, map, of } from "rxjs";

export interface TestState {
  value: number;
}

@State<TestState>({
  name: 'test',
  defaults: {
    value: 0,
  }
})
@Injectable()
export class TestReducer {

  @Action(NgxsAddNumber)
  addNumber(ctx: StateContext<TestState>, action: NgxsAddNumber): void {
    console.timeEnd("fromInitToFind");
    ctx.patchState({
      value: ctx.getState().value + action.value
    });

    console.timeEnd("fromInitToFinish");
  }

  @Action(NgxsRemoveNumber)
  removeNumber(ctx: StateContext<TestState>, action: NgxsRemoveNumber): Observable<unknown> {
    return of(null).pipe(
      map((value) => {
        ctx.patchState({
          value: ctx.getState().value - action.value
        });
      }));
  }

  @Action(NgxsIntervalAdding)
  intervalAdding(ctx: StateContext<TestState>, action: NgxsIntervalAdding): Observable<unknown> {
    return interval(1000).pipe(
      map((val) => {
        ctx.patchState({
          value: ctx.getState().value + action.value
        });
      }));
  }

  @Action(NgxsClearNumber)
  clear(ctx: StateContext<TestState>): void {
    ctx.setState({
      value: 0
    });
  }
}