import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { AnyShape, RectangleProperties } from '@pages/vector-paint/interfaces/vector-shapes.interface';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'g[ds-rectangle]',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './rectangle.component.svg',
  styleUrl: './rectangle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RectangleComponent {
  @Input({ required: true }) set dsShape(value: AnyShape) {
    if (value?.type !== "RECTANGLE") {
      throw new Error('[RectangleComponent] Shape is not a rectangle');
    }
    this.properties = value.properties as RectangleProperties;
  }

  properties: RectangleProperties;
}
