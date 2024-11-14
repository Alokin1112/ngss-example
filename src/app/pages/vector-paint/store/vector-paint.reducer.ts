import { Injectable } from "@angular/core";
import { AnyShape } from "@pages/vector-paint/interfaces/vector-shapes.interface";
import { AddShape, RemoveShape, UpdateShape } from "@pages/vector-paint/store/vector-paint.actions";
import { TEST_INITIAL_SHAPES_DATA } from "@pages/vector-paint/tests/test-initial-shapes-data.const";
import { ActionHandler, ActionHandlerContext, RevertChangesServiceType, RevertChangesStateType, StoreReducer } from "ngss";


export interface VectorPaintState {
  alreadyDrawnShapes: AnyShape[];
}

const initialState: VectorPaintState = {
  alreadyDrawnShapes: TEST_INITIAL_SHAPES_DATA.slice(0, 4),
};

export const VECTOR_PAINT_SAVE_STATE_TYPE: RevertChangesServiceType = 'ONLY_CHANGED_STRING';
export const VECTOR_PAINT_SAVE_STATE_SAVE_TYPE: RevertChangesStateType = "RAW";
export const VECTOR_PAINT_MAX_PREVIOUS_STATES = 30;


@Injectable({ providedIn: 'root' })
export class VectorPaintReducer extends StoreReducer<VectorPaintState> {
  readonly name = "vectorPaint";
  constructor() {
    super(initialState, {
      revert: {
        savePreviousStateType: VECTOR_PAINT_SAVE_STATE_TYPE,
        maxPreviousStates: VECTOR_PAINT_MAX_PREVIOUS_STATES,
        savePreviousStateSaveType: VECTOR_PAINT_SAVE_STATE_SAVE_TYPE
      }
    });
  }

  @ActionHandler(AddShape)
  addShape(context: ActionHandlerContext<VectorPaintState>, payload: AnyShape): void {
    // console.timeEnd("fromInitToFind");
    context.patchState({
      alreadyDrawnShapes: [...(context.getState()?.alreadyDrawnShapes || []), payload],
    });

    // console.timeEnd("fromInitToFinish");
  }

  @ActionHandler(RemoveShape)
  removeShape(context: ActionHandlerContext<VectorPaintState>, payload: number): void {
    const newAlreadyDrawnShapes = context.getState().alreadyDrawnShapes.filter((_, index) => index !== payload);
    context.patchState({
      alreadyDrawnShapes: newAlreadyDrawnShapes,
    });
  }

  @ActionHandler(UpdateShape)
  updateShape(context: ActionHandlerContext<VectorPaintState>, payload: { index: number, shape: AnyShape }): void {
    const newAlreadyDrawnShapes = context.getState().alreadyDrawnShapes.map((shape, index) => {
      if (index === payload.index) {
        return payload.shape;
      }
      return shape;
    });
    context.patchState({
      alreadyDrawnShapes: newAlreadyDrawnShapes,
    });
  }
}