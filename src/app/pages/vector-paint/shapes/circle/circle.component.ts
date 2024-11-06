import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AnyShape, CircleProperties } from '@pages/vector-paint/interfaces/vector-shapes.interface';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'g[ds-circle]',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './circle.component.svg',
  styleUrl: './circle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircleComponent {
  @Input({ required: true }) set dsShape(value: AnyShape) {
    if (value?.type !== "CIRCLE") {
      throw new Error('[RectangleComponent] Shape is not a rectangle');
    }
    this.properties = value.properties as CircleProperties;
  }

  properties: CircleProperties;
}
