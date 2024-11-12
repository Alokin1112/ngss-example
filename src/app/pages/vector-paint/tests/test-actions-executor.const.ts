import { AnyShape } from "@pages/vector-paint/interfaces/vector-shapes.interface";
import { AddShape, RemoveShape, UpdateShape } from "@pages/vector-paint/store/vector-paint.actions";
import { ActionClass, Store } from "ngss";

export interface ExecutionAction<T> {
  type: 'add' | 'update' | 'delete',
  payload: T,
}

export const TestActionsExecutor = (store: Store, actions: ExecutionAction<unknown>[]): void => {
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

  // const start = window.performance.now();
  actionInstances.forEach(action => store.dispatch(action));
};