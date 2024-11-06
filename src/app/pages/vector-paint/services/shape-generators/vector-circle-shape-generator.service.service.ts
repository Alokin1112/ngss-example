import { Injectable } from '@angular/core';
import { VectorCanvasDataWithDrawData } from '@pages/vector-paint/interfaces/vector-canvas-data.interface';
import { VectorShapeGenerator } from '@pages/vector-paint/interfaces/vector-shape-generator.interface';
import { VectorShape } from '@pages/vector-paint/interfaces/vector-shapes.interface';

@Injectable()
export class VectorCircleShapeGeneratorServiceService implements VectorShapeGenerator<"CIRCLE"> {
  generate(data: VectorCanvasDataWithDrawData): VectorShape<'CIRCLE'> {
    const { start, end, activeColor } = data;

    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;

    const radius = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    return {
      type: 'CIRCLE',
      properties: {
        cx: start.x,
        cy: start.y,
        r: radius,
        fill: activeColor,
      }
    };
  }


}
