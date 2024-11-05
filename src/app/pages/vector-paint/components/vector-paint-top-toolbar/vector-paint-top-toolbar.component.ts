import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ds-vector-paint-top-toolbar',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './vector-paint-top-toolbar.component.html',
  styleUrl: './vector-paint-top-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VectorPaintTopToolbarComponent { }
