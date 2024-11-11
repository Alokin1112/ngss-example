import { ActionClass } from "projects/ngss/src/lib/actions/action.class.implementation";
import { RevertChangesSavedStateCompressedService } from "projects/ngss/src/lib/revert-changes/revert-changes-saved-state/revert-changes-saved-state-compressed.service";
import { RevertChangesSavedStateRawService } from "projects/ngss/src/lib/revert-changes/revert-changes-saved-state/revert-changes-saved-state-raw.service";
import { RevertChangesSavedState, RevertChangesSavedStateService } from "projects/ngss/src/lib/revert-changes/revert-changes-service.interface";

const EachRevertChangesSavedStateImplementation = [
  'Raw saved state',
  'Compresed saved state',
];

interface DataToStore {
  name: string,
  address: {
    numOfHouse: number,
    street: string,
  },
  siblings: string[],
}


const SavedStateFactory = (savedStateName: string): RevertChangesSavedStateService<DataToStore> => {
  switch (savedStateName) {
    case 'Raw saved state':
      return new RevertChangesSavedStateRawService();
    case 'Compresed saved state':
      return new RevertChangesSavedStateCompressedService();
    default:
      throw new Error('Invalid saved state name');
  }
};

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

beforeEach(() => {
  jest.clearAllMocks();
});

export class TestAction extends ActionClass<void> {
  override readonly type = "test_action";
}

const getRevertChangesState = (data: DataToStore): RevertChangesSavedState<DataToStore> => ({
  data,
  dateTime: new Date(),
  actionType: 'test_action',
})


describe('saving and getting saved state', () => {

  it.each(EachRevertChangesSavedStateImplementation)('should save and get one saved state for %s', (savedStateName) => {
    const savedState = SavedStateFactory(savedStateName);
    const data: DataToStore = sampleDataToStore[0];

    const stateToSave = getRevertChangesState(data);
    savedState.pushState(stateToSave);
    expect(savedState.getSavedState()).toEqual([stateToSave]);
  });

  it.each(EachRevertChangesSavedStateImplementation)('should save and get multiple saved states for %s', (savedStateName) => {
    const savedState = SavedStateFactory(savedStateName);
    const data: DataToStore = sampleDataToStore[0];

    const stateToSave1 = getRevertChangesState(data);
    const stateToSave2 = getRevertChangesState(data);
    savedState.pushState(stateToSave1);
    savedState.pushState(stateToSave2);
    expect(savedState.getSavedState()).toEqual([stateToSave1, stateToSave2]);
  });

  it.each(EachRevertChangesSavedStateImplementation)('should getSpecifiedSavedStateIndex byNumOfActions work for %s', (savedStateName) => {
    const savedState = SavedStateFactory(savedStateName);
    const [data, data2] = sampleDataToStore;
    const stateToSave1 = getRevertChangesState(data);
    stateToSave1.actionType = 'action1';
    const stateToSave2 = getRevertChangesState(data2);
    savedState.pushState(stateToSave1);
    savedState.pushState(stateToSave2);
    expect(savedState.getSpecifiedSavedStateIndex({ byNumOfActions: 1 })).toBe(0);
  });

  it.each(EachRevertChangesSavedStateImplementation)('should getSpecifiedSavedStateIndex byNumOfActions return 0 if is less actions than passed numOfActions for %s', (savedStateName) => {
    const savedState = SavedStateFactory(savedStateName);
    const [data, data2, data3] = sampleDataToStore;
    savedState.pushState(getRevertChangesState(data));
    savedState.pushState(getRevertChangesState(data2));
    savedState.pushState(getRevertChangesState(data3));
    expect(savedState.getSpecifiedSavedStateIndex({ byNumOfActions: 10 })).toBe(0);
  });

  it.each(EachRevertChangesSavedStateImplementation)('should getSpecifiedSavedStateIndex ByDate work for %s', (savedStateName) => {
    const savedState = SavedStateFactory(savedStateName);
    const [data, data2] = sampleDataToStore;

    const stateToSave1 = getRevertChangesState(data);
    stateToSave1.dateTime = new Date('2021-01-01');
    const stateToSave2 = getRevertChangesState(data2);
    stateToSave2.dateTime = new Date('2024-01-02');
    savedState.pushState(stateToSave1);
    savedState.pushState(stateToSave2);
    expect(savedState.getSpecifiedSavedStateIndex({ byDate: new Date('2021-01-01') })).toBe(0);
  });

  it.each(EachRevertChangesSavedStateImplementation)('should getSpecifiedSavedStateIndex ByDate return -10 if passed date is to early for saved state %s', (savedStateName) => {
    const savedState = SavedStateFactory(savedStateName);
    const [data, data2] = sampleDataToStore;

    const stateToSave1 = getRevertChangesState(data);
    stateToSave1.dateTime = new Date('2021-01-01');
    const stateToSave2 = getRevertChangesState(data2);
    stateToSave2.dateTime = new Date('2024-01-02');
    savedState.pushState(stateToSave1);
    savedState.pushState(stateToSave2);
    expect(savedState.getSpecifiedSavedStateIndex({ byDate: new Date('2025-01-01') })).toBe(-10);
  });

  it.each(EachRevertChangesSavedStateImplementation)('should getSpecifiedSavedStateIndex byAction work for %s', (savedStateName) => {
    const savedState = SavedStateFactory(savedStateName);
    const [data, data2] = sampleDataToStore;

    const stateToSave1 = getRevertChangesState(data);
    const stateToSave2 = getRevertChangesState(data2);
    savedState.pushState(stateToSave1);
    savedState.pushState(stateToSave2);
    expect(savedState.getSpecifiedSavedStateIndex({ byActionType: TestAction, numOfActions: 1 })).toBe(1);
  });

  it.each(EachRevertChangesSavedStateImplementation)('should getSpecifiedSavedStateIndex byAction work for more than 1 action%s', (savedStateName) => {
    const savedState = SavedStateFactory(savedStateName);
    const [data, data2, date3] = sampleDataToStore;

    const stateToSave1 = getRevertChangesState(data);
    const stateToSave2 = getRevertChangesState(data2);
    stateToSave2.actionType = 'action2';
    const stateToSave3 = getRevertChangesState(date3);
    savedState.pushState(stateToSave1);
    savedState.pushState(stateToSave2);
    savedState.pushState(stateToSave3);
    expect(savedState.getSpecifiedSavedStateIndex({ byActionType: TestAction, numOfActions: 2 })).toBe(0);
  });

  it.each(EachRevertChangesSavedStateImplementation)('should getSpecifiedSavedStateIndex byAction return -10 if action not found for %s', (savedStateName) => {
    const savedState = SavedStateFactory(savedStateName);
    const [data, data2] = sampleDataToStore;

    const stateToSave1 = getRevertChangesState(data);
    const stateToSave2 = getRevertChangesState(data2);
    stateToSave1.actionType = 'action1';
    stateToSave2.actionType = 'action2';
    savedState.pushState(stateToSave1);
    savedState.pushState(stateToSave2);
    expect(savedState.getSpecifiedSavedStateIndex({ byActionType: TestAction, numOfActions: 1 })).toBe(-10);
  });

  it.each(EachRevertChangesSavedStateImplementation)('should getLength return 0 if no saved states for %s', (savedStateName) => {
    const savedState = SavedStateFactory(savedStateName);
    expect(savedState.getLength()).toBe(0);
  });

  it.each(EachRevertChangesSavedStateImplementation)('should getLength return 1 if 1 saved state for %s', (savedStateName) => {
    const savedState = SavedStateFactory(savedStateName);
    savedState.pushState(getRevertChangesState(sampleDataToStore[0]));
    expect(savedState.getLength()).toBe(1);
  });

  it.each(EachRevertChangesSavedStateImplementation)('should saveAt work for %s', (savedStateName) => {
    const savedState = SavedStateFactory(savedStateName);
    const [data, data2] = sampleDataToStore;
    const stateToSave1 = getRevertChangesState(data);
    const stateToSave2 = getRevertChangesState(data2);
    savedState.pushState(stateToSave1);
    savedState.saveAt(0, stateToSave2);
    expect(savedState.getSavedState()).toEqual([stateToSave2]);
  });

  it.each(EachRevertChangesSavedStateImplementation)('should saveAt throw error if index out of bounds for %s', (savedStateName) => {
    const savedState = SavedStateFactory(savedStateName);
    const [data, data2] = sampleDataToStore;
    const stateToSave1 = getRevertChangesState(data);
    const stateToSave2 = getRevertChangesState(data2);
    savedState.pushState(stateToSave1);
    expect(() => savedState.saveAt(1, stateToSave2)).toThrow('Index 1 is out of bounds');
  });

  it.each(EachRevertChangesSavedStateImplementation)('should remove work for %s', (savedStateName) => {
    const savedState = SavedStateFactory(savedStateName);
    const [data, data2] = sampleDataToStore;
    const stateToSave1 = getRevertChangesState(data);
    const stateToSave2 = getRevertChangesState(data2);
    savedState.pushState(stateToSave1);
    savedState.pushState(stateToSave2);
    savedState.remove(0, 1);
    expect(savedState.getSavedState()).toEqual([stateToSave2]);
    expect(savedState.getLength()).toBe(1);
  });

  it.each(EachRevertChangesSavedStateImplementation)('should clear work for %s', (savedStateName) => {
    const savedState = SavedStateFactory(savedStateName);
    const [data, data2] = sampleDataToStore;
    const stateToSave1 = getRevertChangesState(data);
    const stateToSave2 = getRevertChangesState(data2);
    savedState.pushState(stateToSave1);
    savedState.pushState(stateToSave2);
    savedState.clear();
    expect(savedState.getSavedState()).toEqual([]);
    expect(savedState.getLength()).toBe(0);
  });

  it.each(EachRevertChangesSavedStateImplementation)('should get work for %s', (savedStateName) => {
    const savedState = SavedStateFactory(savedStateName);
    const [data, data2] = sampleDataToStore;
    const stateToSave1 = getRevertChangesState(data);
    const stateToSave2 = getRevertChangesState(data2);
    savedState.pushState(stateToSave1);
    savedState.pushState(stateToSave2);
    expect(savedState.get(0, 1)).toEqual([stateToSave1]);
    expect(savedState.get(0, 2)).toEqual([stateToSave1, stateToSave2]);
  });

});
