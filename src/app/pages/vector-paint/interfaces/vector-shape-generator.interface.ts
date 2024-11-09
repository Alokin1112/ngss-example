import { VectorCanvasDataWithDrawData } from "@pages/vector-paint/interfaces/vector-canvas-data.interface";
import { VectorShape, VectorShapeType } from "@pages/vector-paint/interfaces/vector-shapes.interface";

export interface VectorShapeGenerator<T extends VectorShapeType> {

  generate(data: VectorCanvasDataWithDrawData): VectorShape<T>
}