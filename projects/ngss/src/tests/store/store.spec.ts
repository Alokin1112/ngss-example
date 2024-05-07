import { signal, WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Dispatch, Middleware, MiddlewareContext } from 'projects/ngss/src/lib/middleware/middleware.interface';
import { ActionClass } from 'projects/ngss/src/lib/actions/action.class.implementation';
import { ReducerInterface } from "projects/ngss/src/lib/reducers/reducers.interface";
import { StoreAdditionalConfig } from "projects/ngss/src/lib/store/store-additional-config.interface";
import { StoreSignal } from 'projects/ngss/src/lib/store/store-signal.class.implementation';
import { StoreClass } from "projects/ngss/src/lib/store/store.class.implementation";
import { Store } from 'projects/ngss/src/lib/store/store.interface';
import { BehaviorSubject } from "rxjs";
import { ActionInterface } from 'projects/ngss/src/lib/actions/actions.interface';

const EACH_STORE_IMPLEMENTATION = [
  'ClassStore',
  'SignalStore',
]

interface ReducerValueInterface {
  count: number;
}

const TestActionType = 'TestAction';

class TestAction extends ActionClass<ReducerValueInterface> {
  override type = TestActionType;
}

const StoreFactory = (storeName: string, reducers: ReducerInterface<unknown>[], config: StoreAdditionalConfig): Store => {
  switch (storeName) {
    case 'ClassStore':
      return new StoreClass(reducers, config);
    case 'SignalStore':
      return new StoreSignal(reducers, config);
    default:
      throw new Error('Invalid store name');
  }
};

const getMockedReducer = (name: string) => {
  const stateObservable = new BehaviorSubject<ReducerValueInterface>({ count: 0 });
  const mockGetState = jest.fn(() => stateObservable.asObservable());
  const stateSignal: WritableSignal<ReducerValueInterface> = signal({ count: 0 });
  const mockGetSignal = jest.fn(() => stateSignal);
  const mockGetSnapshot = jest.fn(() => stateSignal());
  const mockHandleAction = jest.fn();
  const mockReset = jest.fn();
  const mockReducer: ReducerInterface<ReducerValueInterface> = {
    name: name,
    initialValue: {
      count: 0,
    },
    getState: mockGetState,
    getStateSignal: mockGetSignal,
    getSnapshot: mockGetSnapshot,
    handleAction: mockHandleAction,
    reset: mockReset,
  };

  return {
    mockReducer,
    mockGetState,
    mockGetSignal,
    mockGetSnapshot,
    mockHandleAction,
    mockReset,
    stateObservable,
    stateSignal,
  };
};

const getReducersList = (count: number) => {
  const reducers = [];
  for (let i = 0; i < count; i++) {
    reducers.push(getMockedReducer(`reducer${i}`));
  }
  return reducers;
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Basic store functionality", () => {
  it.each(EACH_STORE_IMPLEMENTATION)("should create a store with %s", (storeName) => {
    const reducersData = getReducersList(2);
    const reducers = reducersData.map((reducer) => reducer.mockReducer);
    let store: Store;
    TestBed.runInInjectionContext(() => {
      store = StoreFactory(storeName, reducers, null);
    });
    expect(store).toBeTruthy();
  });

  it.each(EACH_STORE_IMPLEMENTATION)("should select correct snapshot value from the store with %s at beggin", (storeName) => {
    const reducersData = getReducersList(2);
    const reducers = reducersData.map((reducer) => reducer.mockReducer);
    let store: Store;
    TestBed.runInInjectionContext(() => {
      store = StoreFactory(storeName, reducers, null);
    });
    const receivedValue = store.selectSnapshot((state) => state);
    reducersData.forEach((reducer) => {
      expect(reducer.mockGetSnapshot).toHaveBeenCalledTimes(1);
    });
    const expectedValue = reducers.reduce((acc, reducer) => ({ ...acc, [reducer.name]: reducer.getSnapshot() }), {});
    expect(receivedValue).toEqual(expectedValue);
  });

  it.each(EACH_STORE_IMPLEMENTATION)("should reset call each reducer reset method with %s", (storeName) => {
    const reducersData = getReducersList(2);
    const reducers = reducersData.map((reducer) => reducer.mockReducer);
    let store: Store;
    TestBed.runInInjectionContext(() => {
      store = StoreFactory(storeName, reducers, null);
    });
    store.reset();
    reducersData.forEach((reducer) => {
      expect(reducer.mockReset).toHaveBeenCalledTimes(1);
    });
  });

  it.each(EACH_STORE_IMPLEMENTATION)("should dispatch action to each reducer with %s", (storeName) => {
    const reducersData = getReducersList(2);
    const reducers = reducersData.map((reducer) => reducer.mockReducer);
    let store: Store;
    TestBed.runInInjectionContext(() => {
      store = StoreFactory(storeName, reducers, null);
    });
    const action = new TestAction({ count: 1 });
    store.dispatch(action);
    reducersData.forEach((reducer) => {
      expect(reducer.mockHandleAction).toHaveBeenCalledTimes(1);
      expect(reducer.mockHandleAction).toHaveBeenCalledWith(action);
    });
  });

});

describe("Select functionallity", () => {
  it.each(EACH_STORE_IMPLEMENTATION)("should select correct value from the store with %s", (storeName, done) => {
    const reducersData = getReducersList(2);
    const reducers = reducersData.map((reducer) => reducer.mockReducer);
    let store: Store;
    TestBed.runInInjectionContext(() => {
      store = StoreFactory(storeName, reducers, null);
    });
    const receivedValue$ = store.select((state) => state);
    const expectedValue = reducers.reduce((acc, reducer) => ({ ...acc, [reducer.name]: { count: 0 } }), {});
    receivedValue$.subscribe((receivedValue) => {
      expect(receivedValue).toEqual(expectedValue);
      done();
    });
  });

  it.each(EACH_STORE_IMPLEMENTATION)("should select correct value after reducers value change from the store with %s", (storeName, done) => {
    const reducersData = getReducersList(2);
    const reducers = reducersData.map((reducer) => reducer.mockReducer);
    let store: Store;
    TestBed.runInInjectionContext(() => {
      store = StoreFactory(storeName, reducers, null);
    });
    reducersData.forEach((reducer) => {
      if (storeName === 'ClassStore') {
        reducer.stateObservable.next({ count: 1 });
      } else {
        reducer.stateSignal.set({ count: 1 });
      }
    });
    const receivedValue$ = store.select((state) => state);
    const expectedValue = reducers.reduce((acc, reducer) => ({ ...acc, [reducer.name]: { count: 1 } }), {});
    receivedValue$.subscribe((receivedValue) => {
      expect(receivedValue).toEqual(expectedValue);
      done();
    });
  });

  it.each(EACH_STORE_IMPLEMENTATION)("should select correct value after reducers value change with custom callback from the store with %s", (storeName, done) => {
    const reducersData = getReducersList(2);
    const reducers = reducersData.map((reducer) => reducer.mockReducer);
    let store: Store;
    TestBed.runInInjectionContext(() => {
      store = StoreFactory(storeName, reducers, null);
    });
    reducersData.forEach((reducer) => {
      if (storeName === 'ClassStore') {
        reducer.stateObservable.next({ count: 1 });
      } else {
        reducer.stateSignal.set({ count: 1 });
      }
    });
    const receivedValue$ = store.select((state) => state.reducer0.count);
    const expectedValue = 1;
    receivedValue$.subscribe((receivedValue) => {
      expect(receivedValue).toEqual(expectedValue);
      done();
    });
  });

  it.each(EACH_STORE_IMPLEMENTATION)("should selectSignal correct value from the store with %s", (storeName) => {
    const reducersData = getReducersList(2);
    const reducers = reducersData.map((reducer) => reducer.mockReducer);
    let store: Store;
    TestBed.runInInjectionContext(() => {
      store = StoreFactory(storeName, reducers, null);
    });
    const receivedValue = store.selectSignal((state) => state);
    const expectedValue = reducers.reduce((acc, reducer) => ({ ...acc, [reducer.name]: { count: 0 } }), {});
    expect(receivedValue()).toEqual(expectedValue);
  });

  it.each(EACH_STORE_IMPLEMENTATION)("should selectSignal correct value after reducers value change from the store with %s", (storeName) => {
    const reducersData = getReducersList(2);
    const reducers = reducersData.map((reducer) => reducer.mockReducer);
    let store: Store;
    TestBed.runInInjectionContext(() => {
      store = StoreFactory(storeName, reducers, null);
    });
    reducersData.forEach((reducer) => {
      if (storeName === 'ClassStore') {
        reducer.stateObservable.next({ count: 1 });
      } else {
        reducer.stateSignal.set({ count: 1 });
      }
    });
    const receivedValue = store.selectSignal((state) => state);
    const expectedValue = reducers.reduce((acc, reducer) => ({ ...acc, [reducer.name]: { count: 1 } }), {});
    expect(receivedValue()).toEqual(expectedValue);
  });

  it.each(EACH_STORE_IMPLEMENTATION)("should select signal return correct value after reducers value change with custom callback from the store with %s", (storeName) => {
    const reducersData = getReducersList(2);
    const reducers = reducersData.map((reducer) => reducer.mockReducer);
    let store: Store;
    TestBed.runInInjectionContext(() => {
      store = StoreFactory(storeName, reducers, null);
    });
    reducersData.forEach((reducer) => {
      if (storeName === 'ClassStore') {
        reducer.stateObservable.next({ count: 1 });
      } else {
        reducer.stateSignal.set({ count: 1 });
      }
    });
    const receivedValue = store.selectSignal((state) => state.reducer0.count);
    const expectedValue = 1;
    expect(receivedValue()).toEqual(expectedValue);
  });

});

const getMockMiddleware = (): Middleware<unknown>[] => {

  const middleware1: Middleware<unknown> = jest.fn((context: MiddlewareContext<unknown>) => (next: Dispatch) => (action: ActionInterface<unknown>) => {
    next(action);
  });
  const middleware2: Middleware<unknown> = jest.fn((context: MiddlewareContext<unknown>) => (next: Dispatch) => (action: ActionInterface<unknown>) => {
    next(action);
  });

  return [middleware1, middleware2];
};

describe("Handling middlewares", () => {
  it.each(EACH_STORE_IMPLEMENTATION)("should call middleware with %s", (storeName) => {
    const reducersData = getReducersList(2);
    const reducers = reducersData.map((reducer) => reducer.mockReducer);
    const middlewares = getMockMiddleware();
    let store: Store;
    TestBed.runInInjectionContext(() => {
      store = StoreFactory(storeName, reducers, { middlewares });
    });
    store.dispatch(new TestAction({ count: 1 }));
    expect(middlewares[0]).toHaveBeenCalledTimes(1);
    expect(middlewares[1]).toHaveBeenCalledTimes(1);
  });
});