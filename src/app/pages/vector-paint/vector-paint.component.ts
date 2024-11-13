import { effect, Injector, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VectorPaintCanvasComponent } from '@pages/vector-paint/components/vector-paint-canvas/vector-paint-canvas.component';
import { VectorPaintLeftToolbarComponent } from '@pages/vector-paint/components/vector-paint-left-toolbar/vector-paint-left-toolbar.component';
import { VectorPaintTopToolbarComponent } from '@pages/vector-paint/components/vector-paint-top-toolbar/vector-paint-top-toolbar.component';
import { FocusedShape } from '@pages/vector-paint/interfaces/vector-canvas-data.interface';
import { ToolItemType } from '@pages/vector-paint/interfaces/vector-paint-tool-options.interface';
import { VECTOR_PAINT_SAVE_STATE_SAVE_TYPE, VECTOR_PAINT_SAVE_STATE_TYPE, VectorPaintReducer } from '@pages/vector-paint/store/vector-paint.reducer';
import { RevertChangesSavedStateService, RevertChangesServiceType, Store } from 'ngss';
import { RevertChangesSavedStateAccessor } from '@pages/vector-paint/tests/test-revert-changes-saved-state.accessor';
import { TEST_DATA_RECORD, TEST_VERSIONS_ORDER, TestActionsExecutor, TestVersions } from '@pages/vector-paint/tests/test-actions-executor.const';
import { TEST_MODIFY_ACTION_ADD_REMOVE, TEST_MODIFY_ACTION_ADD_UPDATE, TEST_MODIFY_ACTIONS_ONLY_ADD, TEST_MODIFY_ACTIONS_ONLY_UPDATE, TEST_MODIFY_ADD_UPDATE_REMOVE } from '@pages/vector-paint/tests/test-modify-actions.const';
import { ActivatedRoute, Router } from '@angular/router';
import { sleep, statisticsCall } from '@pages/vector-paint/tests/api-statitics-caller.const';

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
export class VectorPaintComponent implements OnInit {

  focusedShape: WritableSignal<FocusedShape> = signal(null);
  activeTool: ToolItemType = "CURSOR";
  activeColor = '#78fa3c';
  reducer: RevertChangesSavedStateAccessor<unknown>;


  constructor(
    private vectorPaintReducer: VectorPaintReducer,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) {

    this.reducer = vectorPaintReducer as unknown as RevertChangesSavedStateAccessor<unknown>;
    // console.log(reducer?.revertChangesService?.stateService);
    // console.log((new Blob([JSON.stringify(initialState?.alreadyDrawnShapes)])).size);
    // console.log(this.store.selectSnapshot(state => state.vectorPaint.alreadyDrawnShapes));

  }

  async ngOnInit(): Promise<void> {
    const activeTestVersion = this.route.snapshot.queryParams['testVersion'] as TestVersions;
    if (!activeTestVersion) return;
    console.log("Active test version: ", activeTestVersion);
    // await sleep(1000);
    const activeTestData = TEST_DATA_RECORD[activeTestVersion];
    TestActionsExecutor(this.store, activeTestData);
    void this.router.navigate(['./'], { relativeTo: this.route });
    const stateLengthInBytes = (new Blob([JSON.stringify((this.reducer.revertChangesService.stateService as any).savedState as any)])).size;
    const fileDir = `${VECTOR_PAINT_SAVE_STATE_TYPE}--${VECTOR_PAINT_SAVE_STATE_SAVE_TYPE}--${activeTestVersion}`;

    const res = await statisticsCall(fileDir, stateLengthInBytes);

    if (res?.line_count < 40) {
      this.reloadPage(activeTestVersion);
    } else {
      const nextIndex = TEST_VERSIONS_ORDER.indexOf(activeTestVersion) + 1;
      if (nextIndex >= TEST_VERSIONS_ORDER.length) return;
      this.reloadPage(TEST_VERSIONS_ORDER[nextIndex]);
    }

  }

  changeFocusedShape(shape: FocusedShape): void {
    this.focusedShape.set(shape);
  }

  private reloadPage(testVersion: string): void {
    window.location = `${window.location.href}?testVersion=${testVersion}` as any;
  }
}
