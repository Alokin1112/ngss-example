import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VectorPaintCanvasComponent } from '@pages/vector-paint/components/vector-paint-canvas/vector-paint-canvas.component';
import { VectorPaintLeftToolbarComponent } from '@pages/vector-paint/components/vector-paint-left-toolbar/vector-paint-left-toolbar.component';
import { VectorPaintTopToolbarComponent } from '@pages/vector-paint/components/vector-paint-top-toolbar/vector-paint-top-toolbar.component';
import { ToolItemType } from '@pages/vector-paint/interfaces/vector-paint-tool-options.interface';

@Component({
  selector: 'ds-vector-paint',
  standalone: true,
  imports: [
    CommonModule, VectorPaintTopToolbarComponent, VectorPaintLeftToolbarComponent, VectorPaintCanvasComponent
  ],
  templateUrl: './vector-paint.component.html',
  styleUrl: './vector-paint.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VectorPaintComponent {

  activeTool: ToolItemType = "CURSOR";

  activeColor = '#78fa3c';
}
