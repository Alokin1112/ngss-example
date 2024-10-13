import { NgrxAddNumber, NgrxIntervalAdding, NgrxRemoveNumber } from "@app/store/ngrx/ngrx-testing.store.actions";
import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";

export interface TestState {
  value: number;
}

export const initialState: TestState = {
  value: 0,
};


export const testReducer = createReducer(
  initialState,
  on(NgrxRemoveNumber, (state, { value }) => ({ ...state, value: state.value - value })),
  on(NgrxAddNumber, (state, { value }) => {
    console.timeEnd("fromInitToFind");
    const newState = ({ ...state, value: state.value + value });
    console.timeEnd("fromInitToFinish");
    return newState;
  }),
  on(NgrxIntervalAdding, (state, { value }) => ({ ...state, value: state.value + value * 2 })),
);

export const testReducerValue = createSelector(
  createFeatureSelector<TestState>('test'),
  (state: TestState) => state.value
);