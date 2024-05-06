import { TestBed } from "@angular/core/testing";
import { ReducersSubscriptionHandlerService } from "projects/ngss/src/lib/reducers/reducers-subscription-handler.service";
import { ReducerInterface } from "projects/ngss/src/lib/reducers/reducers.interface";
import { DumbReducerTestService } from "projects/ngss/src/tests/reducers/dumb-reducer-test.service";
import { TestReducer } from "projects/ngss/src/tests/reducers/reducer.class.mock";
import { TestReducerSignal } from "projects/ngss/src/tests/reducers/reducer.signal.mock";
import * as ReducerTestUtils from "projects/ngss/src/tests/reducers/reducer.test.utils";

const EACH_REDUCER_IMPLEMENTATION = [
  'ClassReducer',
  'SignalReducer',
];

const getMockedReducersSubscriptionHandlerService = () => {
  const mockAddSubscription = jest.fn();
  const mockCompleteAllSubscriptions = jest.fn();
  const mockCompleteSubscriptions = jest.fn();

  const reducerSubscriptionHandlerService = {
    addSubscription: mockAddSubscription,
    completeAllSubscriptions: mockCompleteAllSubscriptions,
    completeSubscriptions: mockCompleteSubscriptions,
  } as unknown as ReducersSubscriptionHandlerService;

  return {
    reducerSubscriptionHandlerService,
    mockAddSubscription,
    mockCompleteAllSubscriptions,
    mockCompleteSubscriptions,
  };
};

const MockReducerSubscriptionHandlerService = getMockedReducersSubscriptionHandlerService();

const ReducerFactory = (storeName: string): ReducerInterface<ReducerTestUtils.ReducerValueInterface> => {
  let reducer: ReducerInterface<ReducerTestUtils.ReducerValueInterface>;
  TestBed.runInInjectionContext(() => {
    switch (storeName) {
      case 'ClassReducer':
        reducer = new TestReducer();
        break;
      case 'SignalReducer':
        reducer = new TestReducerSignal();
        break;
      default:
        throw new Error('Invalid store name');
    }
  });
  return reducer;
};


beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      {
        provide: ReducersSubscriptionHandlerService,
        useValue: MockReducerSubscriptionHandlerService,
      },
      DumbReducerTestService
    ]
  });
  jest.clearAllMocks();
});

describe("Reducer basic tests", () => {
  it.each(EACH_REDUCER_IMPLEMENTATION)("should create a reducer for $s ", (reducerName) => {
    let reducer: ReducerInterface<ReducerTestUtils.ReducerValueInterface>;
    TestBed.runInInjectionContext(() => {
      reducer = ReducerFactory(reducerName);
    });
    expect(reducer).toBeDefined();
  });

  it.each(EACH_REDUCER_IMPLEMENTATION)("should return properly name for $s", (reducerName) => {
    let reducer: ReducerInterface<ReducerTestUtils.ReducerValueInterface>;
    TestBed.runInInjectionContext(() => {
      reducer = ReducerFactory(reducerName);
    });
    expect(reducer.name).toBe(ReducerTestUtils.TEST_REDUCER_NAME);
  });


  it.each(EACH_REDUCER_IMPLEMENTATION)("should return properly initial value for $s", (reducerName) => {
    let reducer: ReducerInterface<ReducerTestUtils.ReducerValueInterface>;
    TestBed.runInInjectionContext(() => {
      reducer = ReducerFactory(reducerName);
    });
    expect(reducer.initialValue).toEqual(ReducerTestUtils.InitialState);
  });
});