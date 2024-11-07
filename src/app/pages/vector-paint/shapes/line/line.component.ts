import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AnyShape, LineProperties } from '@pages/vector-paint/interfaces/vector-shapes.interface';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'g[ds-line]',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './line.component.svg',
  styleUrl: './line.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineComponent {
  @Input({ required: true }) set dsShape(value: AnyShape) {
    if (value?.type !== "LINE") {
      throw new Error('[LineComponent] Shape is not a line');
    }
    this.properties = value.properties as LineProperties;
  }

  properties: LineProperties;
}
