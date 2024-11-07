import { VectorShapeType } from "@pages/vector-paint/interfaces/vector-shapes.interface";

export type ToolItemType = 'CURSOR' | 'RECTANGLE' | 'ELLIPSE' | 'TRIANGLE' | 'LINE';

export interface ToolItem {
  icon: string,
  label: string,
  value: ToolItemType,
}


export const ToolItemToShape: Record<ToolItemType, VectorShapeType> = {
  CURSOR: null,
  RECTANGLE: 'RECTANGLE',
  ELLIPSE: 'ELLIPSE',
  TRIANGLE: 'TRIANGLE',
  LINE: 'LINE',
}