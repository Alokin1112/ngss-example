import { ToolItemType } from "@pages/vector-paint/interfaces/vector-paint-tool-options.interface";
import { AnyShape, VectorShapePropertyMap, VectorShapeType } from "@pages/vector-paint/interfaces/vector-shapes.interface";

export interface VectorCanvasData {
  activeTool: ToolItemType,
  activeColor: string,
}

export interface VectorCanvasDataWithDrawData extends VectorCanvasData {
  shapeType: VectorShapeType,
  start: VectorCanvasPosition,
  end: VectorCanvasPosition,
}

export interface VectorCanvasPosition {
  x: number,
  y: number,
}

export interface FocusedShape {
  shape: AnyShape,
  idx: number
}

export interface ShapeEditInput<T extends VectorShapeType> {
  type: ShapeEditInputType,
  label: string,
  pathToProperty: keyof VectorShapePropertyMap[T],
}

export type ShapeEditInputType = 'number' | 'text' | 'color';