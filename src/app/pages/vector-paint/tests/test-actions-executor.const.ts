import { AnyShape } from "@pages/vector-paint/interfaces/vector-shapes.interface";
import { AddShape, UpdateShape } from "@pages/vector-paint/store/vector-paint.actions";
import { ActionClass, Store } from "ngss";

export interface ExecutionAction<T> {
  type: 'add' | 'update',
  payload: T,
}

export const TestActionsExecutor = (store: Store, actions: ExecutionAction<unknown>[]): void => {
  const actionInstances: ActionClass<unknown>[] = actions.map(action => {
    if (action.type === 'add') {
      return new AddShape(action.payload as AnyShape);
    } else {
      return new UpdateShape(action.payload as { index: number, shape: AnyShape });
    }
  });

  actionInstances.forEach(action => store.dispatch(action));
};