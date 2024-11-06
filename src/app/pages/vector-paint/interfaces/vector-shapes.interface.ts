export interface VectorShape<T extends VectorShapeType> {
  type: T,
  properties: VectorShapePropertyMap[T]
}
export type AnyShape = VectorShape<VectorShapeType>;

export type VectorShapeType = 'RECTANGLE' | 'CIRCLE' | 'LINE' | 'TRIANGLE';


interface VectorShapePropertyMap extends Record<VectorShapeType, object> {
  RECTANGLE: RectangleProperties;
  CIRCLE: CircleProperties;
  LINE: { length: number; angle: number };
  TRIANGLE: { base: number; height: number };
}

export interface RectangleProperties {
  x: number,
  y: number,
  width: number,
  height: number,
  fill: string,
}

export interface CircleProperties {
  cx: number,
  cy: number,
  r: number,
  fill: string,
}