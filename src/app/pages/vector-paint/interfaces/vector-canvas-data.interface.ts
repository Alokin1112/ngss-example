import { ToolItemType } from "@pages/vector-paint/interfaces/vector-paint-tool-options.interface";
import { VectorShapeType } from "@pages/vector-paint/interfaces/vector-shapes.interface";

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