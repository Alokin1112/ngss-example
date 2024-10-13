import { createAction, props } from "@ngrx/store";

export const NgrxAddNumber = createAction(
  '[TestStore] AddNumber',
  props<{ value: number }>()
);

export const NgrxRemoveNumber = createAction(
  '[TestStore] RemoveNumber',
  props<{ value: number }>()
);

export const NgrxIntervalAdding = createAction(
  '[TestStore] IntervalAdding',
  props<{ value: number }>()
);

export const NgrxClearNumber = createAction(
  '[TestStore] ClearNumber',
);
