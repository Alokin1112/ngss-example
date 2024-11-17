import { AnyShape } from "@pages/vector-paint/interfaces/vector-shapes.interface";
import { AddShape, RemoveShape, UpdateShape } from "@pages/vector-paint/store/vector-paint.actions";
import { TEST_MODIFY_ACTION_ADD_REMOVE, TEST_MODIFY_ACTION_ADD_UPDATE, TEST_MODIFY_ACTIONS_ONLY_ADD, TEST_MODIFY_ACTIONS_ONLY_REMOVE, TEST_MODIFY_ACTIONS_ONLY_UPDATE, TEST_MODIFY_ADD_UPDATE_REMOVE } from "@pages/vector-paint/tests/test-modify-actions.const";
import { ActionClass, Store } from "ngss";

export interface ExecutionAction<T> {
  type: 'add' | 'update' | 'delete',
  payload: T,
}



export const TestActionsExecutor = (store: Store, actions: ExecutionAction<unknown>[]): number => {
  const actionInstances: ActionClass<unknown>[] = actions.map(action => {
    if (action.type === 'add') {
      return new AddShape(action.payload as AnyShape);
    } else if (action.type === 'update') {
      return new UpdateShape(action.payload as { index: number, shape: AnyShape });
    } else if (action.type === 'delete') {
      return new RemoveShape(action.payload as number);
    } else {
      throw new Error('Invalid action type');
    }
  });

  const dispatchTimes: number[] = [];
  actionInstances.forEach(action => {
    const start = window.performance.now();
    store.dispatch(action);
    const end = window.performance.now();
    dispatchTimes.push(end - start);
  });

  return dispatchTimes.reduce((acc, curr) => acc + curr, 0) / (dispatchTimes.length || 1);
};

export type TestVersions = 'add' | 'update' | 'remove' | 'add-update' | 'add-remove' | 'add-update-remove';

export const TEST_VERSIONS_ORDER: TestVersions[] = ['add', 'update', 'remove', 'add-update', 'add-remove', 'add-update-remove'];

export const TEST_DATA_RECORD: Record<TestVersions, ExecutionAction<unknown>[]> = {
  'add': TEST_MODIFY_ACTIONS_ONLY_ADD,
  'update': TEST_MODIFY_ACTIONS_ONLY_UPDATE,
  'remove': TEST_MODIFY_ACTIONS_ONLY_REMOVE,
  'add-update': TEST_MODIFY_ACTION_ADD_UPDATE,
  'add-remove': TEST_MODIFY_ACTION_ADD_REMOVE,
  'add-update-remove': TEST_MODIFY_ADD_UPDATE_REMOVE,
};