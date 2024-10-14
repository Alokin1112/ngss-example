import { createAction, props, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";

export const NgrxAddNumber{Param} = createAction(
  '[TestStore{Param}] AddNumber',
  props<{ value: number }>()
);

export const NgrxRemoveNumber{Param} = createAction(
  '[TestStore{Param}] RemoveNumber',
  props<{ value: number }>()
);

export const NgrxIntervalAdding{Param} = createAction(
  '[TestStore{Param}] IntervalAdding',
  props<{ value: number }>()
);

export const NgrxClearNumber{Param} = createAction(
  '[TestStore{Param}] ClearNumber',
);


export interface TestState{Param} {
  value: number;
}

export const initialState{Param}: TestState{Param} = {
  value: 0,
};


export const multipleReducer{Param} = createReducer(
  initialState{Param},
  on(NgrxRemoveNumber{Param}, (state, { value }) => ({ ...state, value: state.value - value })),
  on(NgrxAddNumber{Param}, (state, { value }) => {
    const newState = ({ ...state, value: state.value + value });
    return newState;
  }),
  on(NgrxIntervalAdding{Param}, (state, { value }) => ({ ...state, value: state.value + value * 2 })),
);