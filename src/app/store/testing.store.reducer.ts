import { Injectable } from "@angular/core";
import { StoreReducer } from "ngss";

export interface TestState {
  value: number;
}

const initialState: TestState = {
  value: 0,
}

@Injectable({ providedIn: 'root' })
export class TestReducer extends StoreReducer<TestState> {
  readonly name = "test";
  constructor() {
    super(initialState);
  }

  // @ActionHandler(new AddNumber(5))
  // addNumber(context: ActionHandlerContext<TestState>, payload: number): void {
  //   context.patchState({
  //     value: context.getState().value + payload
  //   });
  // }
}