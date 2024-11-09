import { Injectable } from '@angular/core';
import { VectorCanvasDataWithDrawData } from '@pages/vector-paint/interfaces/vector-canvas-data.interface';
import { VectorShapeGenerator } from '@pages/vector-paint/interfaces/vector-shape-generator.interface';
import { AnyShape, VectorShapeType } from '@pages/vector-paint/interfaces/vector-shapes.interface';
import { VectorEllipseShapeGeneratorServiceService } from '@pages/vector-paint/services/shape-generators/vector-ellipse-shape-generator.service.service';
import { VectorLineShapeGeneratorService } from '@pages/vector-paint/services/shape-generators/vector-line-shape-generator.service';
import { VectorRectangleShapeGeneratorService } from '@pages/vector-paint/services/shape-generators/vector-rectangle-shape-generator.service';
import { VectorTriangleShapeGeneratorService } from "@pages/vector-paint/services/shape-generators/vector-triangle-shape-generator.service";

@Injectable()
export class VectorShapesGeneratorService {

  constructor(
    private vectorRectangleShapeGeneratorService: VectorRectangleShapeGeneratorService,
    private vectorEllipseShapeGeneratorServiceService: VectorEllipseShapeGeneratorServiceService,
    private vectorLineShapeGeneratorService: VectorLineShapeGeneratorService,
    private vectorTriangleShapeGeneratorService: VectorTriangleShapeGeneratorService,
  ) { }

  generate(data: VectorCanvasDataWithDrawData): AnyShape {
    if (!data?.shapeType) return null;
    const generator = this.getShapeGenerator(data?.shapeType);

    return generator.generate(data);
  }


  private getShapeGenerator<T extends VectorShapeType>(type: T): VectorShapeGenerator<T> {
    switch (type) {
      case "RECTANGLE":
        return this.vectorRectangleShapeGeneratorService as unknown as VectorShapeGenerator<T>;
      case "ELLIPSE":
        return this.vectorEllipseShapeGeneratorServiceService as unknown as VectorShapeGenerator<T>;
      case "LINE":
        return this.vectorLineShapeGeneratorService as unknown as VectorShapeGenerator<T>;
      case 'TRIANGLE':
        return this.vectorTriangleShapeGeneratorService as unknown as VectorShapeGenerator<T>;
      default:
        throw new Error(`Unknown shape type: ${type}`);
    }
  }

}
