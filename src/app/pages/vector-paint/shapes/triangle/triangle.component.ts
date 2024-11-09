import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AnyShape, TriangleProperties } from '@pages/vector-paint/interfaces/vector-shapes.interface';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'g[ds-triangle]',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './triangle.component.svg',
  styleUrl: './triangle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TriangleComponent {
  @Input({ required: true }) set dsShape(value: AnyShape) {
    if (value?.type !== "TRIANGLE") {
      throw new Error('[TriangleComponent] Shape is not a triangle');
    }
    this.properties = value.properties as TriangleProperties;
  }

  properties: TriangleProperties;


  get points() {
    const { baseStartX, baseStartY, baseWidth, height } = this.properties;

    return `${baseStartX},${baseStartY} ${baseStartX + baseWidth},${baseStartY} ${baseStartX + baseWidth / 2},${baseStartY - height}`;
  }

  get transform() {
    return `rotate(${this.properties.rotateDeg || 0}, ${this.properties.rotateX || 0}, ${this.properties.rotateY || 0})`;
  }
}
