import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, EventEmitter, HostListener, Injector, input, OnDestroy, OnInit, Output, Signal, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FocusableDirective } from '@pages/vector-paint/directives/focusable.directive';
import { FocusedShape, VectorCanvasData, VectorCanvasDataWithDrawData, VectorCanvasPosition } from '@pages/vector-paint/interfaces/vector-canvas-data.interface';
import { ToolItemToShape } from '@pages/vector-paint/interfaces/vector-paint-tool-options.interface';
import { AnyShape } from '@pages/vector-paint/interfaces/vector-shapes.interface';
import { VectorShapesGeneratorService } from "@pages/vector-paint/services/vector-shapes-generator.service";
import { EllipseComponent } from '@pages/vector-paint/shapes/ellipse/ellipse.component';
import { LineComponent } from '@pages/vector-paint/shapes/line/line.component';
import { RectangleComponent } from '@pages/vector-paint/shapes/rectangle/rectangle.component';
import { isEqual } from 'lodash';
import { pairwise, tap, switchMap, of, filter, Subject, takeUntil, debounceTime, distinctUntilChanged, map, merge, Observable } from 'rxjs';

@Component({
  selector: 'ds-vector-paint-canvas',
  standalone: true,
  imports: [
    CommonModule,
    RectangleComponent,
    EllipseComponent,
    FocusableDirective,
    LineComponent
  ],
  templateUrl: './vector-paint-canvas.component.svg',
  styleUrl: './vector-paint-canvas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VectorPaintCanvasComponent implements OnInit, OnDestroy {


  dsUpdatedShape = input.required<FocusedShape>();
  dsCanvasData = input.required<VectorCanvasData>();
  @Output() dsFocusedElement = new EventEmitter<FocusedShape>();


  startPosition: VectorCanvasPosition;
  focusedElement: WritableSignal<FocusedShape> = signal(null);
  allFigures: Signal<AnyShape[]>;
  alreadyDrawnFigures: WritableSignal<AnyShape[]> = signal([] as AnyShape[]);
  newFigure: WritableSignal<AnyShape | null> = signal(null);

  private isDragging = false;
  private onDestroy$ = new Subject<void>();

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
    if (figure) {
      this.alreadyDrawnFigures.set([...this.alreadyDrawnFigures(), figure]);
    }
    this.newFigure.set(null);
    this.startPosition = null;
  }


  fillColor = 'rgb(255, 0, 0)';

  constructor(
    private elementRef: ElementRef,
    private shapeGenerator: VectorShapesGeneratorService,
    private injector: Injector,
  ) { }

  ngOnInit(): void {
    this.allFigures = computed(() => {
      const figures = [...(this.alreadyDrawnFigures() || [])];
      const newFigure = this.newFigure();
      const figureToReplace = this.dsUpdatedShape();
      if (figureToReplace) {
        figures[figureToReplace.idx] = figureToReplace.shape;
      }

      return newFigure ? [...figures, newFigure] : figures;
    });

    effect(() => {
      if (this.dsCanvasData()?.activeTool !== 'CURSOR') {
        this.updateFocusedElement(null);
      }
    }, { injector: this.injector, allowSignalWrites: true });


    this.updateAlradDrawnFigures().pipe(
      filter((shape) => !isEqual(shape?.shape, this.alreadyDrawnFigures()[shape.idx])),
      takeUntil(this.onDestroy$),
    ).subscribe((shape) => {
      console.log('update shape', shape);
      const alreadyDrawnFigures = [...(this.alreadyDrawnFigures() || [])];
      alreadyDrawnFigures[shape.idx] = shape.shape;
      this.alreadyDrawnFigures.set(alreadyDrawnFigures);
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  handleItemClick(figure: AnyShape, idx: number): void {
    if (this.dsCanvasData()?.activeTool !== 'CURSOR') return;
    this.updateFocusedElement({ shape: figure, idx });
  }

  updateFocusedElement(shape: FocusedShape): void {
    this.focusedElement.set(shape);
    this.dsFocusedElement.emit(shape);
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

  private updateAlradDrawnFigures(): Observable<FocusedShape> {
    const updatedShape$ = toObservable(this.dsUpdatedShape, { injector: this.injector });

    const updateAfterFocusChange$ = updatedShape$.pipe(
      pairwise(),
      filter(([prev, actual]) => prev?.idx !== actual?.idx),
      map(([prev, actual]) => prev),
      filter((shape) => !!shape),
    );

    const updateDuringEditing = updatedShape$.pipe(
      pairwise(),
      filter(([prev, actual]) => prev?.idx === actual?.idx),
      debounceTime(800),
      map(([prev, actual]) => actual),
      filter((shape) => !!shape),
      distinctUntilChanged(),
    );

    return merge(updateAfterFocusChange$, updateDuringEditing);
  }
}
