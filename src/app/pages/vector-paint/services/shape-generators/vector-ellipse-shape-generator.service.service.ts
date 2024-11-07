import { Injectable } from '@angular/core';
import { VectorCanvasDataWithDrawData } from '@pages/vector-paint/interfaces/vector-canvas-data.interface';
import { VectorShapeGenerator } from '@pages/vector-paint/interfaces/vector-shape-generator.interface';
import { VectorShape } from '@pages/vector-paint/interfaces/vector-shapes.interface';

@Injectable()
export class VectorEllipseShapeGeneratorServiceService implements VectorShapeGenerator<"ELLIPSE"> {
  generate(data: VectorCanvasDataWithDrawData): VectorShape<'ELLIPSE'> {
    const { start, end, activeColor } = data;

    const rx = Math.floor(Math.abs(end.x - start.x) / 2);
    const ry = Math.floor(Math.abs(end.y - start.y) / 2);

    const cx = Math.floor((start.x + end.x) / 2);
    const cy = Math.floor((start.y + end.y) / 2);

    return {
      type: 'ELLIPSE',
      properties: {
        cx,
        cy,
        rx,
        ry,
        fill: activeColor,
      }
    };
  }


}
