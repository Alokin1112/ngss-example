import { effect, Injector, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VectorPaintCanvasComponent } from '@pages/vector-paint/components/vector-paint-canvas/vector-paint-canvas.component';
import { VectorPaintLeftToolbarComponent } from '@pages/vector-paint/components/vector-paint-left-toolbar/vector-paint-left-toolbar.component';
import { VectorPaintTopToolbarComponent } from '@pages/vector-paint/components/vector-paint-top-toolbar/vector-paint-top-toolbar.component';
import { FocusedShape } from '@pages/vector-paint/interfaces/vector-canvas-data.interface';
import { ToolItemType } from '@pages/vector-paint/interfaces/vector-paint-tool-options.interface';
import { VectorPaintReducer } from '@pages/vector-paint/store/vector-paint.reducer';
import { RevertChangesSavedStateService, Store } from 'ngss';
import { RevertChangesSavedStateAccessor } from '@pages/vector-paint/tests/test-revert-changes-saved-state.accessor';
import { TestActionsExecutor } from '@pages/vector-paint/tests/test-actions-executor.const';
import { TEST_MODIFY_ACTION_ADD_REMOVE, TEST_MODIFY_ACTION_ADD_UPDATE, TEST_MODIFY_ACTIONS_ONLY_ADD, TEST_MODIFY_ACTIONS_ONLY_UPDATE, TEST_MODIFY_ADD_UPDATE_REMOVE } from '@pages/vector-paint/tests/test-modify-actions.const';

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

  focusedShape: WritableSignal<FocusedShape> = signal(null);
  activeTool: ToolItemType = "CURSOR";
  activeColor = '#78fa3c';

  constructor(
    private vectorPaintReducer: VectorPaintReducer,
    private store: Store,
  ) {

    const reducer = vectorPaintReducer as unknown as RevertChangesSavedStateAccessor<unknown>;
    console.log(reducer?.revertChangesService?.stateService);
    // console.log((new Blob([JSON.stringify(initialState?.alreadyDrawnShapes)])).size);
    TestActionsExecutor(this.store, TEST_MODIFY_ADD_UPDATE_REMOVE);
    console.log(this.store.selectSnapshot(state => state.vectorPaint.alreadyDrawnShapes));

  }

  changeFocusedShape(shape: FocusedShape): void {
    this.focusedShape.set(shape);
  }
}
