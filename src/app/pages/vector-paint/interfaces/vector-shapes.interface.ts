export interface VectorShape<T extends VectorShapeType> {
  type: T,
  properties: VectorShapePropertyMap[T]
}
export type AnyShape = VectorShape<VectorShapeType>;

export type VectorShapeType = 'RECTANGLE' | 'ELLIPSE' | 'LINE' | 'TRIANGLE';


export interface VectorShapePropertyMap extends Record<VectorShapeType, object> {
  RECTANGLE: RectangleProperties;
  ELLIPSE: EllipseProperties;
  LINE: LineProperties;
  TRIANGLE: TriangleProperties;
}

export interface RectangleProperties {
  x: number,
  y: number,
  width: number,
  height: number,
  fill: string,
  rotateDeg: number,
  rotateX: number,
  rotateY: number,
}

export interface EllipseProperties {
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  fill: string,
  rotateDeg: number,
  rotateX: number,
  rotateY: number,
}

export interface LineProperties {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  fill: string,
  width: number,
  rotateDeg?: number,
  rotateX?: number,
  rotateY?: number,
}

export interface TriangleProperties {
  baseStartX: number,
  baseStartY: number,
  baseWidth: number,
  height: number,
  fill: string,
  rotateDeg?: number,
  rotateX?: number,
  rotateY?: number,
}