import { ActionClass } from "projects/ngss/src/lib/actions/action.class.implementation";

namespace ReducerTests {
  export interface ReducerValueInterface {
    count: number;
  }

  export const InitialState: ReducerValueInterface = {
    count: 0,
  };

  export const TestActionType = 'TestAction';

  export class TestAction extends ActionClass<ReducerValueInterface> {
    override type = TestActionType;
  }

}