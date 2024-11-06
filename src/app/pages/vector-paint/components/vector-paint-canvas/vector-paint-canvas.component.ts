import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, computed, ElementRef, HostListener, input, OnInit, Signal, signal, ViewChild, WritableSignal } from '@angular/core';
import { BASIC_FIGURES } from '@pages/vector-paint/constants/basic-figures.mock';
import { FocusableDirective } from '@pages/vector-paint/directives/focusable.directive';
import { VectorCanvasData, VectorCanvasDataWithDrawData, VectorCanvasPosition } from '@pages/vector-paint/interfaces/vector-canvas-data.interface';
import { ToolItemToShape } from '@pages/vector-paint/interfaces/vector-paint-tool-options.interface';
import { AnyShape } from '@pages/vector-paint/interfaces/vector-shapes.interface';
import { CircleComponent } from '@pages/vector-paint/shapes/circle/circle.component';
import { RectangleComponent } from '@pages/vector-paint/shapes/rectangle/rectangle.component';
import { VectorShapesGeneratorService } from "@pages/vector-paint/services/vector-shapes-generator.service";

@Component({
  selector: 'ds-vector-paint-canvas',
  standalone: true,
  imports: [
    CommonModule,
    RectangleComponent,
    CircleComponent,
    FocusableDirective
  ],
  templateUrl: './vector-paint-canvas.component.svg',
  styleUrl: './vector-paint-canvas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VectorPaintCanvasComponent implements OnInit {

  dsCanvasData = input.required<VectorCanvasData>();

  startPosition: VectorCanvasPosition;
  allFigures: Signal<AnyShape[]>;
  alreadyDrawnFigures: WritableSignal<AnyShape[]> = signal([] as AnyShape[]);
  newFigure: WritableSignal<AnyShape | null> = signal(null);

  private isDragging = false;

  @HostListener('mousedown', ['$event'])
  onMouseDown(e: MouseEvent) {
    this.isDragging = true;
    const rect = (this.elementRef.nativeElement as HTMLElement).getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);
    this.startPosition = { x, y };
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.isDragging) return;
    const rect = (this.elementRef.nativeElement as HTMLElement).getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);
    const figure = this.getDrawFigure({ x, y });
    this.newFigure.set(figure);
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(e: MouseEvent) {
    this.isDragging = false;
    const rect = (this.elementRef.nativeElement as HTMLElement).getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);
    const figure = this.getDrawFigure({ x, y });
    this.alreadyDrawnFigures.set([...this.alreadyDrawnFigures(), figure]);
    this.newFigure.set(null);
    this.startPosition = null;
  }


  fillColor = 'rgb(255, 0, 0)';

  constructor(
    private elementRef: ElementRef,
    private shapeGenerator: VectorShapesGeneratorService,
  ) { }

  ngOnInit(): void {
    this.allFigures = computed(() => {
      const figures = this.alreadyDrawnFigures();
      const newFigure = this.newFigure();

      return newFigure ? [...figures, newFigure] : figures;
    });
  }


  private getDrawFigure(end: VectorCanvasPosition): AnyShape {
    const start = this.startPosition;
    const drawData = this.getVectorCanvasDataWithDrawData(start, end);

    return this.shapeGenerator.generate(drawData);
  }

  private getVectorCanvasDataWithDrawData(start: VectorCanvasPosition, end: VectorCanvasPosition): VectorCanvasDataWithDrawData {
    return {
      ...this.dsCanvasData(),
      shapeType: ToolItemToShape[this.dsCanvasData().activeTool],
      start,
      end,
    };
  }
}
