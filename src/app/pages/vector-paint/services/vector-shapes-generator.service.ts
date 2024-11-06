import { Injectable } from '@angular/core';
import { VectorCanvasDataWithDrawData } from '@pages/vector-paint/interfaces/vector-canvas-data.interface';
import { VectorShapeGenerator } from '@pages/vector-paint/interfaces/vector-shape-generator.interface';
import { AnyShape, VectorShapeType } from '@pages/vector-paint/interfaces/vector-shapes.interface';
import { VectorRectangleShapeGeneratorService } from '@pages/vector-paint/services/shape-generators/vector-rectangle-shape-generator.service';
import { VectorCircleShapeGeneratorServiceService } from '@pages/vector-paint/services/shape-generators/vector-circle-shape-generator.service.service';

@Injectable()
export class VectorShapesGeneratorService {

  constructor(
    private vectorRectangleShapeGeneratorService: VectorRectangleShapeGeneratorService,
    private vectorCircleShapeGeneratorServiceService: VectorCircleShapeGeneratorServiceService,
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
      case "CIRCLE":
        return this.vectorCircleShapeGeneratorServiceService as unknown as VectorShapeGenerator<T>;
      default:
        throw new Error(`Unknown shape type: ${type}`);
    }
  }

}
