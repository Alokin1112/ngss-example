import { AnyShape } from "@pages/vector-paint/interfaces/vector-shapes.interface";

export const BASIC_FIGURES: AnyShape[] = [
  {
    type: 'RECTANGLE',
    properties: {
      x: 10,
      y: 10,
      width: 100,
      height: 100,
      fill: 'rgb(255, 0, 0)'
    }
  },
  {
    type: 'CIRCLE',
    properties: {
      cx: 200,
      cy: 200,
      r: 50,
      fill: 'rgb(0, 255, 0)'
    }
  },
  {
    type: 'RECTANGLE',
    properties: {
      x: 300,
      y: 300,
      width: 100,
      height: 100,
      fill: 'rgb(0, 0, 255)'
    }
  },
  {
    type: 'CIRCLE',
    properties: {
      cx: 400,
      cy: 400,
      r: 50,
      fill: 'rgb(255, 0, 255)'
    }
  }
]