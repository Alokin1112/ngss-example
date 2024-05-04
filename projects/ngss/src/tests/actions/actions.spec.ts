import { ActionClass } from "projects/ngss/src/lib/actions/action.class.implementation";

interface TestActionInterface {
  name: string,
  age: number,
  address: string,
}

const TestActionType = 'TestAction';

class TestAction extends ActionClass<TestActionInterface> {
  override type = TestActionType;
}

const TestActionMockData: TestActionInterface = {
  name: 'John Doe',
  age: 25,
  address: '123 Main St.',
};

describe("Store action", () => {
  it("should properly craete an action", () => {
    const action = new TestAction(TestActionMockData);
    expect(action).toBeTruthy();
  });

  it("should have the correct type", () => {
    const action = new TestAction(TestActionMockData);
    expect(action.type).toBe(TestActionType);
  });

  it("should have the correct payload", () => {
    const action = new TestAction(TestActionMockData);
    expect(action.payload).toEqual(TestActionMockData);
  });
});