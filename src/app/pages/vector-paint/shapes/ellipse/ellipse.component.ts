import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AnyShape, EllipseProperties } from '@pages/vector-paint/interfaces/vector-shapes.interface';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'g[ds-ellipse]',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './ellipse.component.svg',
  styleUrl: './ellipse.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EllipseComponent {
  @Input({ required: true }) set dsShape(value: AnyShape) {
    if (value?.type !== "ELLIPSE") {
      throw new Error('[EllipseComponent] Shape is not a ellipse');
    }
    this.properties = value.properties as EllipseProperties;
  }

  properties: EllipseProperties;
}
