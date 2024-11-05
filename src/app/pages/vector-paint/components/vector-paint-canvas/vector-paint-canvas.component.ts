import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CircleComponent } from '@pages/vector-paint/shapes/circle/circle.component';
import { RectangleComponent } from '@pages/vector-paint/shapes/rectangle/rectangle.component';

@Component({
  selector: 'ds-vector-paint-canvas',
  standalone: true,
  imports: [
    CommonModule,
    RectangleComponent,
    CircleComponent
  ],
  templateUrl: './vector-paint-canvas.component.svg',
  styleUrl: './vector-paint-canvas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VectorPaintCanvasComponent implements AfterViewInit {

  @ViewChild("toRender") elem: any;

  isDragging = false;

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    // console.log(e);
  }


  fillColor = 'rgb(255, 0, 0)';

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    // console.log(this.elem);
    // const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    // path.setAttribute('fill', 'none');
    // path.setAttribute('stroke', '#000000');
    // path.setAttribute('stroke-width', '5');
    // path.setAttribute('d', 'M5 20 l200 100');
    // this.elem?.nativeElement.appendChild(path);
  }
}
