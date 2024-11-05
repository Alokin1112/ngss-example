import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';

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
  @Input() x!: number;
  @Input() y!: number;
  @Input() width!: number;
  @Input() height!: number;
  @Input() fill!: string;
}
