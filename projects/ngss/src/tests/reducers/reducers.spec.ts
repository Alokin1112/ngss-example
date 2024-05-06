import { TestBed } from "@angular/core/testing";
import { StoreReducer } from "ngss";
import { ActionClass } from "projects/ngss/src/lib/actions/action.class.implementation";
import { ReducersSubscriptionHandlerService } from "projects/ngss/src/lib/reducers/reducers-subscription-handler.service";
import { ReducerInterface } from "projects/ngss/src/lib/reducers/reducers.interface";

const EACH_REDUCER_IMPLEMENTATION = [
  'ClassReducer',
  'SignalReducer',
]

interface ReducerValueInterface {
  count: number;
}

const InitialState: ReducerValueInterface = {
  count: 0,
};

const TestActionType = 'TestAction';

class TestAction extends ActionClass<ReducerValueInterface> {
  override type = TestActionType;
}

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

const ReducerFactory = (storeName: string): ReducerInterface<ReducerValueInterface> => {
  let reducer: ReducerInterface<ReducerValueInterface>;
  TestBed.runInInjectionContext(() => {
    switch (storeName) {
      case 'ClassReducer':
        reducer = new StoreReducer(InitialState);
      case 'SignalReducer':
        return new StoreSignal(reducers, config);
      default:
        throw new Error('Invalid store name');
    }
  })
};


beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      {
        provide: ReducersSubscriptionHandlerService,
        useValue: MockReducerSubscriptionHandlerService,
      }
    ]
  });
  jest.clearAllMocks();
});