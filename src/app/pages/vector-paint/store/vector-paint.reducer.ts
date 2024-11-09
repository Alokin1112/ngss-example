import { Injectable } from "@angular/core";
import { AnyShape } from "@pages/vector-paint/interfaces/vector-shapes.interface";
import { AddShape, RemoveShape, UpdateShape } from "@pages/vector-paint/store/vector-paint.actions";
import { ActionHandler, ActionHandlerContext, StoreReducer } from "ngss";


export interface VectorPaintState {
  alreadyDrawnShapes: AnyShape[];
}

const initialState: VectorPaintState = {
  alreadyDrawnShapes: [],
};


@Injectable({ providedIn: 'root' })
export class VectorPaintReducer extends StoreReducer<VectorPaintState> {
  readonly name = "vectorPaint";
  constructor() {
    super(initialState, { revert: { savePreviousStateType: 'ONLY_CHANGED_TOP_DOWN', maxPreviousStates: 20, savePreviousStateSaveType: "COMPRESSED_WEB_ASSEMBLY" } });
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