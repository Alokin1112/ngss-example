import { AnyShape } from "@pages/vector-paint/interfaces/vector-shapes.interface";
import { ActionClass } from "ngss";

export class AddShape extends ActionClass<AnyShape> {
  override readonly type = "[VectorPaint] AddShape";
}

export class RemoveShape extends ActionClass<number> {
  override readonly type = "[VectorPaint] RemoveShape";
}

export class UpdateShape extends ActionClass<{ index: number, shape: AnyShape }> {
  override readonly type = "[VectorPaint] UpdateShape";
}