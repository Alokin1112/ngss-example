import { ActionInterface } from "projects/ngss/src/lib/actions/actions.interface";

export type Middleware<S> = (context: MiddlewareContext<S>) =>
  (next: Dispatch) =>
    (action: ActionInterface<unknown>) => void;


export interface MiddlewareContext<S> {
  getState: () => S;
}

export type Dispatch = (action: ActionInterface<unknown>) => void;