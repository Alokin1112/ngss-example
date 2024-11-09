import { Injectable } from '@angular/core';
import { VectorCanvasDataWithDrawData } from '@pages/vector-paint/interfaces/vector-canvas-data.interface';
import { VectorShapeGenerator } from '@pages/vector-paint/interfaces/vector-shape-generator.interface';
import { VectorShape } from '@pages/vector-paint/interfaces/vector-shapes.interface';

@Injectable()
export class VectorLineShapeGeneratorService implements VectorShapeGenerator<"LINE"> {

  generate(data: VectorCanvasDataWithDrawData): VectorShape<'LINE'> {
    return {
      type: 'LINE',
      properties: {
        x1: data.start.x,
        y1: data.start.y,
        x2: data.end.x,
        y2: data.end.y,
        fill: data.activeColor,
        width: 2,
        rotateDeg: 0,
        rotateX: Math.floor((data.start.x + data.end.x) / 2),
        rotateY: Math.floor((data.start.y + data.end.y) / 2),
      }
    };
  }

}
