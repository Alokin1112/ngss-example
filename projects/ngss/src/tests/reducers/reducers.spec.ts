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
        useValue: MockReducerSubscriptionHandlerService.reducerSubscriptionHandlerService,
      },
      DumbReducerTestService
    ]
  });
  jest.clearAllMocks();
});

describe("Reducer basic tests", () => {
  it.each(EACH_REDUCER_IMPLEMENTATION)("should create a reducer for %s ", (reducerName) => {
    let reducer: ReducerInterface<ReducerTestUtils.ReducerValueInterface>;
    TestBed.runInInjectionContext(() => {
      reducer = ReducerFactory(reducerName);
    });
    expect(reducer).toBeDefined();
  });

  it.each(EACH_REDUCER_IMPLEMENTATION)("should return properly name for %s", (reducerName) => {
    let reducer: ReducerInterface<ReducerTestUtils.ReducerValueInterface>;
    TestBed.runInInjectionContext(() => {
      reducer = ReducerFactory(reducerName);
    });
    expect(reducer.name).toBe(ReducerTestUtils.TEST_REDUCER_NAME);
  });


  it.each(EACH_REDUCER_IMPLEMENTATION)("should return properly initial value for %s", (reducerName) => {
    let reducer: ReducerInterface<ReducerTestUtils.ReducerValueInterface>;
    TestBed.runInInjectionContext(() => {
      reducer = ReducerFactory(reducerName);
    });
    expect(reducer.initialValue).toEqual(ReducerTestUtils.InitialState);
  });

  it.each(EACH_REDUCER_IMPLEMENTATION)("should return properly snapshot after init for %s", (reducerName) => {
    let reducer: ReducerInterface<ReducerTestUtils.ReducerValueInterface>;
    TestBed.runInInjectionContext(() => {
      reducer = ReducerFactory(reducerName);
    });
    expect(reducer.getSnapshot()).toEqual(ReducerTestUtils.InitialState);
  });

  it.each(EACH_REDUCER_IMPLEMENTATION)("should return properly observable state after init for %s", (reducerName, done) => {
    let reducer: ReducerInterface<ReducerTestUtils.ReducerValueInterface>;
    TestBed.runInInjectionContext(() => {
      reducer = ReducerFactory(reducerName);
    });
    reducer.getState().subscribe((state) => {
      expect(state).toEqual(ReducerTestUtils.InitialState);
      done();
    });
  });

  it.each(EACH_REDUCER_IMPLEMENTATION)("should return properly signal state after init for %s", (reducerName) => {
    let reducer: ReducerInterface<ReducerTestUtils.ReducerValueInterface>;
    TestBed.runInInjectionContext(() => {
      reducer = ReducerFactory(reducerName);
    });
    expect(reducer.getStateSignal()()).toEqual(ReducerTestUtils.InitialState);
  });

});

describe("Reducer handling actions", () => {
  it.each(EACH_REDUCER_IMPLEMENTATION)("should handle basic action for %s", (reducerName) => {
    let reducer: ReducerInterface<ReducerTestUtils.ReducerValueInterface>;
    TestBed.runInInjectionContext(() => {
      reducer = ReducerFactory(reducerName);
    });
    const countOnInit = reducer.getSnapshot().count;
    const dispatchedCount = 1;
    reducer.handleAction(new ReducerTestUtils.TestAction({ count: dispatchedCount }));
    expect(reducer.getSnapshot()).toEqual({ count: countOnInit + dispatchedCount + DumbReducerTestService.RETURN_VALUE });
  });

  it.each(EACH_REDUCER_IMPLEMENTATION)("should return proper observable state after handling action for %s", (reducerName, done) => {
    let reducer: ReducerInterface<ReducerTestUtils.ReducerValueInterface>;
    TestBed.runInInjectionContext(() => {
      reducer = ReducerFactory(reducerName);
    });
    const countOnInit = reducer.getSnapshot().count;
    const dispatchedCount = 1;
    reducer.handleAction(new ReducerTestUtils.TestAction({ count: dispatchedCount }));
    reducer.getState().subscribe((state) => {
      expect(state).toEqual({ count: countOnInit + dispatchedCount + DumbReducerTestService.RETURN_VALUE });
      done();
    });
  });

  it.each(EACH_REDUCER_IMPLEMENTATION)("should return proper signal state after handling action for %s", (reducerName) => {
    let reducer: ReducerInterface<ReducerTestUtils.ReducerValueInterface>;
    TestBed.runInInjectionContext(() => {
      reducer = ReducerFactory(reducerName);
    });
    const countOnInit = reducer.getSnapshot().count;
    const dispatchedCount = 1;
    reducer.handleAction(new ReducerTestUtils.TestAction({ count: dispatchedCount }));
    expect(reducer.getStateSignal()()).toEqual({ count: countOnInit + dispatchedCount + DumbReducerTestService.RETURN_VALUE });
  });

  it.each(EACH_REDUCER_IMPLEMENTATION)("should handle observable action for %s", (reducerName, done) => {
    let reducer: ReducerInterface<ReducerTestUtils.ReducerValueInterface>;
    TestBed.runInInjectionContext(() => {
      reducer = ReducerFactory(reducerName);
    });
    const countOnInit = reducer.getSnapshot().count;
    const dispatchedCount = 1;
    reducer.handleAction(new ReducerTestUtils.TestActionObservable({ count: dispatchedCount }));
    reducer.getState().subscribe((state) => {
      const expectedState = { count: countOnInit + dispatchedCount + DumbReducerTestService.RETURN_VALUE };
      if (state.count === expectedState.count) {
        expect(state).toEqual(expectedState);
        done();
      }
    });
  });

  it.each(EACH_REDUCER_IMPLEMENTATION)("should add subscription to service after handling method %s", (reducerName) => {
    let reducer: ReducerInterface<ReducerTestUtils.ReducerValueInterface>;
    TestBed.runInInjectionContext(() => {
      reducer = ReducerFactory(reducerName);
    });
    const dispatchedCount = 1;
    reducer.handleAction(new ReducerTestUtils.TestActionObservable({ count: dispatchedCount }));
    expect(MockReducerSubscriptionHandlerService.mockAddSubscription).toHaveBeenCalled();
  });
});

describe("Reducer reset", () => {
  it.each(EACH_REDUCER_IMPLEMENTATION)("should reset reducer to initial state for %s", (reducerName) => {
    let reducer: ReducerInterface<ReducerTestUtils.ReducerValueInterface>;
    TestBed.runInInjectionContext(() => {
      reducer = ReducerFactory(reducerName);
    });
    const dispatchedCount = 1;
    reducer.handleAction(new ReducerTestUtils.TestAction({ count: dispatchedCount }));
    reducer.reset();
    expect(reducer.getSnapshot()).toEqual(ReducerTestUtils.InitialState);
  });

  it.each(EACH_REDUCER_IMPLEMENTATION)("should reset after observable action %s", (reducerName) => {
    let reducer: ReducerInterface<ReducerTestUtils.ReducerValueInterface>;
    TestBed.runInInjectionContext(() => {
      reducer = ReducerFactory(reducerName);
    });
    const dispatchedCount = 1;
    reducer.handleAction(new ReducerTestUtils.TestActionObservable({ count: dispatchedCount }));
    reducer.reset();
    expect(reducer.getSnapshot()).toEqual(ReducerTestUtils.InitialState);
  });

  it.each(EACH_REDUCER_IMPLEMENTATION)("should complete all subscriptions after reset for %s", (reducerName) => {
    let reducer: ReducerInterface<ReducerTestUtils.ReducerValueInterface>;
    TestBed.runInInjectionContext(() => {
      reducer = ReducerFactory(reducerName);
    });
    const dispatchedCount = 1;
    reducer.handleAction(new ReducerTestUtils.TestActionObservable({ count: dispatchedCount }));
    reducer.reset();
    expect(MockReducerSubscriptionHandlerService.mockCompleteAllSubscriptions).toHaveBeenCalled();
  });

  it.each(EACH_REDUCER_IMPLEMENTATION)("should properly return observable after reset %s", (reducerName, done) => {
    let reducer: ReducerInterface<ReducerTestUtils.ReducerValueInterface>;
    TestBed.runInInjectionContext(() => {
      reducer = ReducerFactory(reducerName);
    });
    const dispatchedCount = 1;
    reducer.handleAction(new ReducerTestUtils.TestAction({ count: dispatchedCount }));
    reducer.reset();
    reducer.getState().subscribe((state) => {
      expect(state).toEqual(ReducerTestUtils.InitialState);
      done();
    });
  });

  it.each(EACH_REDUCER_IMPLEMENTATION)("should properly return signal after reset %s", (reducerName) => {
    let reducer: ReducerInterface<ReducerTestUtils.ReducerValueInterface>;
    TestBed.runInInjectionContext(() => {
      reducer = ReducerFactory(reducerName);
    });
    const dispatchedCount = 1;
    reducer.handleAction(new ReducerTestUtils.TestAction({ count: dispatchedCount }));
    reducer.reset();
    expect(reducer.getStateSignal()()).toEqual(ReducerTestUtils.InitialState);
  });
});