import { AddNumber } from "@app/store/testing.store.actions";
import { ActionInterface, Dispatch, Middleware, MiddlewareContext } from "ngss";

export const Mid0: Middleware<unknown> = (context: MiddlewareContext<unknown>) => (next: Dispatch) => (action: ActionInterface<unknown>) => {
  console.log('Middleware 0 previous:', context.getState());
  next(action);
  console.log('Middleware 0 next:', context.getState());
}

export const Mid1: Middleware<unknown> = (context: MiddlewareContext<unknown>) => (next: Dispatch) => (action: ActionInterface<unknown>) => {
  if (action.getType() === "AddNumber" && action.getPayload() === 2) {
    next(new AddNumber(3));
  } else {
    next(action);
  }
};

export const Mid2: Middleware<unknown> = (context: MiddlewareContext<unknown>) => (next: Dispatch) => (action: ActionInterface<unknown>) => {
  console.log('Middleware 2');
  next(action);
};