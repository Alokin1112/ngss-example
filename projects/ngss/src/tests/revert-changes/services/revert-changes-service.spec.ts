import { ActionInterface } from "projects/ngss/src/lib/actions/actions.interface";
import { ReducerRevertOptions } from "projects/ngss/src/lib/reducers/reducers-options.interface";
import { RevertChangesSavedStateRawService } from "projects/ngss/src/lib/revert-changes/revert-changes-saved-state/revert-changes-saved-state-raw.service";
import { RevertChangesService, StateChangeCallback } from "projects/ngss/src/lib/revert-changes/revert-changes-service.interface";
import { RevertChangesAllStateService } from "projects/ngss/src/lib/revert-changes/services/revert-changes-all-state.service";
import { RevertChangesNaiveDetectionService } from "projects/ngss/src/lib/revert-changes/services/revert-changes-naive-detection.service";
import { RevertChangesOnlyChangedTopDownService } from "projects/ngss/src/lib/revert-changes/services/revert-changes-only-changed-top-down.service";
import { RevertChangesOnlyChangedService } from "projects/ngss/src/lib/revert-changes/services/revert-changes-only-changed.service";


const EachRevertChangesServiceImplementation = [
  'ALL_STATE',
  'ONLY_CHANGED_NAIVE',
  'ONLY_CHANGED',
  'ONLY_CHANGED_TOP_DOWN',
];

interface DataToStore {
  name: string,
  address: {
    numOfHouse: number,
    street: string,
  },
  siblings: string[],
}

const sampleDataToStore: DataToStore[] = [
  {
    name: 'John Doe',
    address: {
      numOfHouse: 123,
      street: 'Main Street',
    },
    siblings: ['Jane Doe', 'Jack Doe'],
  },
  {
    name: 'Jane Doe',
    address: {
      numOfHouse: 123,
      street: 'Main Street',
    },
    siblings: ['John Doe', 'Jack Doe'],
  },
  {
    name: 'Jack Doe',
    address: {
      numOfHouse: 123,
      street: 'Main Street',
    },
    siblings: ['John Doe', 'Jane Doe'],
  },
]

const options: ReducerRevertOptions = {
  maxPreviousStates: 5,
  savePreviousStateSaveType: 'RAW',
  savePreviousStateType: 'ALL_STATE',
};

const getHandledAction = (action = 'testAction'): ActionInterface<unknown> => ({
  getPayload() {
    return {};
  },
  getType() {
    return action;
  },
});

const mockRevertChangesCallBack: StateChangeCallback<DataToStore> = jest.fn();
let revertChangesSavedStateRaw = new RevertChangesSavedStateRawService<DataToStore>();

beforeEach(() => {
  revertChangesSavedStateRaw = new RevertChangesSavedStateRawService<DataToStore>();
  jest.resetAllMocks();
});

const RevertChangesServiceFactory = (serviceName: string): RevertChangesService<DataToStore> => {
  switch (serviceName) {
    case 'ALL_STATE':
      return new RevertChangesAllStateService<DataToStore>(options, revertChangesSavedStateRaw);
    case 'ONLY_CHANGED_NAIVE':
      return new RevertChangesNaiveDetectionService<DataToStore>(options, revertChangesSavedStateRaw);
    case 'ONLY_CHANGED':
      return new RevertChangesOnlyChangedService<DataToStore>(options, revertChangesSavedStateRaw);
    case 'ONLY_CHANGED_TOP_DOWN':
      return new RevertChangesOnlyChangedTopDownService<DataToStore>(options, revertChangesSavedStateRaw);
    default:
      throw new Error(`Unsupported savePreviousStateType: ${serviceName}`);
  }
};

describe('RevertChangesService', () => {
  it.each(EachRevertChangesServiceImplementation)('should revert changes for %s', (serviceName) => {
    const revertChangesService = RevertChangesServiceFactory(serviceName);
    const [data1, data2, data3] = sampleDataToStore;
    revertChangesService.saveInitialState(data1);
    revertChangesService.saveChanges(data2, getHandledAction());
    revertChangesService.saveChanges(data3, getHandledAction());
    revertChangesService.revertChanges({ byNumOfActions: 1 }, mockRevertChangesCallBack);
    expect(mockRevertChangesCallBack).toHaveBeenCalledTimes(1);
    expect(mockRevertChangesCallBack).toHaveBeenCalledWith(data2);
  });

  it.each(EachRevertChangesServiceImplementation)('should revert changes for %s by number of states', (serviceName) => {
    const revertChangesService = RevertChangesServiceFactory(serviceName);
    const [data1, data2, data3] = sampleDataToStore;
    revertChangesService.saveInitialState(data1);
    revertChangesService.saveChanges(data2, getHandledAction());
    revertChangesService.saveChanges(data3, getHandledAction());
    revertChangesService.saveChanges(data1, getHandledAction());
    revertChangesService.revertChanges({ byNumOfActions: 2 }, mockRevertChangesCallBack);
    expect(mockRevertChangesCallBack).toHaveBeenCalledTimes(1);
    expect(mockRevertChangesCallBack).toHaveBeenCalledWith(data2);
  });

  it.each(EachRevertChangesServiceImplementation)('should revert changes for %s should work multiple times', (serviceName) => {
    const revertChangesService = RevertChangesServiceFactory(serviceName);
    const [data1, data2, data3] = sampleDataToStore;
    revertChangesService.saveInitialState(data1);
    revertChangesService.saveChanges(data2, getHandledAction());
    revertChangesService.saveChanges(data3, getHandledAction());
    revertChangesService.saveChanges(data1, getHandledAction());
    revertChangesService.revertChanges({ byNumOfActions: 1 }, mockRevertChangesCallBack);
    expect(mockRevertChangesCallBack).toHaveBeenCalledTimes(1);
    expect(mockRevertChangesCallBack).toHaveBeenCalledWith(data3);
    revertChangesService.revertChanges({ byNumOfActions: 1 }, mockRevertChangesCallBack);
    expect(mockRevertChangesCallBack).toHaveBeenCalledTimes(2);
    expect(mockRevertChangesCallBack).toHaveBeenCalledWith(data2);
  });

});