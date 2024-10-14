import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { StoreActionType, StoreHandler } from '@core/interfaces/store-handler.interface';
import { StoreHandlerFactoryService } from '@core/services/store-handler-factory.service';
import { Store } from '@ngxs/store';

@Component({
  selector: 'ds-test-component',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatCardModule, MatIconModule
  ],
  templateUrl: './test-component.component.html',
  styleUrl: './test-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponentComponent {
  // @Selector((state: { test: { value: number } }) => state?.test.value)
  // numberSelector$: Observable<number>;

  // @SignalSelector((state: { test: { value: number } }) => state?.test.value)
  // numberSignalSelector$: Signal<number>;

  // numberSignal$: Signal<number>;
  number$: Observable<number>;
  type: StoreActionType = StoreActionType.CUSTOM;

  store: StoreHandler;

  constructor(
    private storeHandlerFactoryService: StoreHandlerFactoryService,
  ) {
    this.store = this.storeHandlerFactoryService.get(this.type);
    this.number$ = this.store.getValue();
    // this.numberSignal$ = this.store.selectSignal((state) => state?.test.value as number);
  }

  increment(): void {
    console.time("fromInitToFind");
    console.time("fromInitToFinish");
    this.store.add(1);
  }

  incrementWithMiddleWare(): void {
    this.store.add(2);
  }

  decrement(): void {
    this.store.remove(1);
  }

  interval(): void {
    this.store.interval(1);
  }

  reset(): void {
    this.store.clear();
  }
}
