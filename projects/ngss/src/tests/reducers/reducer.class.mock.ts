import { StoreReducer } from 'projects/ngss/src/lib/reducers/reducers.class.implementation';
import { inject, Injectable } from "@angular/core";
import * as ReducerTestUtils from "projects/ngss/src/tests/reducers/reducer.test.utils";
import { ActionHandler, ActionHandlerContext } from 'projects/ngss/src/lib/decorators/action-handler.decorator';
import { DumbReducerTestService } from 'projects/ngss/src/tests/reducers/dumb-reducer-test.service';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TestReducer extends StoreReducer<ReducerTestUtils.ReducerValueInterface> {
  readonly name = ReducerTestUtils.TEST_REDUCER_NAME;

  dumbReducerTestService = inject(DumbReducerTestService);
  constructor() {
    super(ReducerTestUtils.InitialState);
  }

  @ActionHandler(ReducerTestUtils.TestAction)
  addNumber(context: ActionHandlerContext<ReducerTestUtils.ReducerValueInterface>, payload: ReducerTestUtils.ReducerValueInterface): void {
    context.patchState({
      count: context.getState().count + payload.count + this.dumbReducerTestService.getValue(),
    });
  }

  @ActionHandler(ReducerTestUtils.TestActionObservable)
  addNumberObservable(context: ActionHandlerContext<ReducerTestUtils.ReducerValueInterface>, payload: ReducerTestUtils.ReducerValueInterface): Observable<unknown> {
    return this.dumbReducerTestService.getValueObservable().pipe(
      tap((value) => {
        context.patchState({
          count: context.getState().count + payload.count + value,
        });
      })
    );
  }

}