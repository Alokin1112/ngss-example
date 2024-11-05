import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
  @Input() cx!: number;
  @Input() cy!: number;
  @Input() r!: number;
  @Input() fill!: string;
}
