import { Injectable } from '@angular/core';
import { VectorCanvasDataWithDrawData } from '@pages/vector-paint/interfaces/vector-canvas-data.interface';
import { VectorShapeGenerator } from '@pages/vector-paint/interfaces/vector-shape-generator.interface';
import { VectorShape } from '@pages/vector-paint/interfaces/vector-shapes.interface';

@Injectable()
export class VectorTriangleShapeGeneratorService implements VectorShapeGenerator<"TRIANGLE"> {

  generate(data: VectorCanvasDataWithDrawData): VectorShape<'TRIANGLE'> {

    const baseWidth = data.end.x - data.start.x;

    return {
      type: 'TRIANGLE',
      properties: {
        baseStartX: baseWidth > 0 ? data.start.x : data.end.x,
        baseStartY: data.end.y,
        baseWidth: Math.abs(baseWidth),
        height: data.end.y - data.start.y,
        fill: data?.activeColor,
        rotateDeg: 0,
        rotateX: Math.floor((data.start.x + data.end.x) / 2),
        rotateY: Math.floor((data.start.y + data.end.y) / 2),
      }
    }
  }

}
