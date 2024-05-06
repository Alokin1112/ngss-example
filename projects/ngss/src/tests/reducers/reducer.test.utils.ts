import { ActionClass } from "projects/ngss/src/lib/actions/action.class.implementation";

export interface ReducerValueInterface {
  count: number;
}

export const TEST_REDUCER_NAME = 'TestReducer';

export const InitialState: ReducerValueInterface = {
  count: 0,
};

export const TestActionType = 'TestAction';

export class TestAction extends ActionClass<ReducerValueInterface> {
  override type = TestActionType;
}

export class TestActionObservable extends ActionClass<ReducerValueInterface> {
  override type = TestActionType + "Observable";
}

