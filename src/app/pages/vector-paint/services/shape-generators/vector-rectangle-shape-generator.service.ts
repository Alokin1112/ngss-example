import { Injectable } from '@angular/core';
import { VectorCanvasDataWithDrawData } from '@pages/vector-paint/interfaces/vector-canvas-data.interface';
import { VectorShapeGenerator } from '@pages/vector-paint/interfaces/vector-shape-generator.interface';
import { VectorShape } from '@pages/vector-paint/interfaces/vector-shapes.interface';

@Injectable()
export class VectorRectangleShapeGeneratorService implements VectorShapeGenerator<"RECTANGLE"> {

  generate(data: VectorCanvasDataWithDrawData): VectorShape<'RECTANGLE'> {

    const { start, end, activeColor } = data;

    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;

    return {
      type: 'RECTANGLE',
      properties: {
        x: deltaX > 0 ? start.x : end.x,
        y: deltaY > 0 ? start.y : end.y,
        width: Math.abs(deltaX),
        height: Math.abs(deltaY),
        fill: activeColor,
        rotateDeg: 0,
        rotateX: Math.floor((start.x + end.x) / 2),
        rotateY: Math.floor((start.y + end.y) / 2),
      }
    };
  }

}
