import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, model, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FocusedShape, ShapeEditInput, ShapeEditInputType } from '@pages/vector-paint/interfaces/vector-canvas-data.interface';
import { VectorShape, VectorShapePropertyMap, VectorShapeType } from '@pages/vector-paint/interfaces/vector-shapes.interface';
import { distinctUntilChanged, map, Observable, of, pairwise, switchMap } from 'rxjs';

@Component({
  selector: 'ds-vector-paint-top-toolbar',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatIconModule, MatTooltipModule, MatFormFieldModule, MatInputModule, FormsModule
  ],
  templateUrl: './vector-paint-top-toolbar.component.html',
  styleUrl: './vector-paint-top-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class VectorPaintTopToolbarComponent<T extends VectorShapeType> implements OnInit {

  shapeToUpdate = model.required<FocusedShape>();

  inputs$: Observable<ShapeEditInput<T>[]>;

  constructor(
    private injector: Injector,
  ) { }

  ngOnInit(): void {
    this.inputs$ = toObservable(this.shapeToUpdate, { injector: this.injector }).pipe(
      map((shape) => this.calculateInputs(shape)),
      distinctUntilChanged(),
    );
  }

  get shape(): VectorShape<T> {
    return this.shapeToUpdate()?.shape as VectorShape<T>;
  }

  updateField(pathToProperty: keyof VectorShapePropertyMap[T], type: ShapeEditInputType, value: unknown): void {
    const shape = this.shapeToUpdate();
    if (!shape) {
      return;
    }
    const newData: FocusedShape = {
      ...shape,
      shape: {
        ...shape.shape,
        properties: {
          ...shape.shape.properties,
          [pathToProperty]: type == 'number' ? Number(value) : value,
        },
      },
    };
    this.shapeToUpdate.set(newData);
  }


  private calculateInputs(shape: FocusedShape): ShapeEditInput<T>[] {
    const props = shape?.shape?.properties;

    if (!props) {
      return [];
    }

    return Object.entries(props).map(([key, value]) => ({
      label: this.cammelCaseToTitleCase(key || ''),
      pathToProperty: key as keyof VectorShapePropertyMap[T],
      type: this.getInputType(value),
    } as ShapeEditInput<T>)).filter((input) => input.type !== null);

  }

  private cammelCaseToTitleCase(str: string): string {
    return str.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
  }

  private getInputType(value: unknown): ShapeEditInputType {
    if (typeof value === 'string') {
      if (value.startsWith('#')) {
        return 'color';
      }
      return 'text';
    }
    if (typeof value === 'number') {
      return 'number';
    }
    return null;
  }

}
