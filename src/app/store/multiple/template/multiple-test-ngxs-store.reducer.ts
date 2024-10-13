import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Observable, interval, map, of } from "rxjs";

export interface TestState{Param} {
  value: number;
}

export class NgxsAddNumber{Param} {
  static readonly type = '[TestStore{Param}] AddNumber';

  constructor(public value: number) { }
}

export class NgxsRemoveNumber{Param} {
  static readonly type = '[TestStore{Param}] RemoveNumber';

  constructor(public value: number) { }
}

export class NgxsIntervalAdding{Param} {
  static readonly type = '[TestStore{Param}] IntervalAdding';

  constructor(public value: number) { }
}

@State<TestState{Param}>({
  name: 'test{Param}',
  defaults: {
    value: 0,
  }
})
@Injectable()
export class MultipleReducer{Param} {

  @Action(NgxsAddNumber{Param})
  addNumber(ctx: StateContext<TestState{Param}>, action: NgxsAddNumber{Param}): void {
    ctx.patchState({
      value: ctx.getState().value + action.value
    });

  }

  @Action(NgxsRemoveNumber{Param})
  removeNumber(ctx: StateContext<TestState{Param}>, action: NgxsRemoveNumber{Param}): Observable<unknown> {
    return of(null).pipe(
      map((value) => {
        ctx.patchState({
          value: ctx.getState().value - action.value
        });
      }));
  }

  @Action(NgxsIntervalAdding{Param})
  intervalAdding(ctx: StateContext<TestState{Param}>, action: NgxsIntervalAdding{Param}): Observable<unknown> {
    return interval(1000).pipe(
      map((val) => {
        ctx.patchState({
          value: ctx.getState().value + action.value
        });
      }));
  }
}