import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { AddNumber, IntervalAdding, RemoveNumber } from '@app/store/testing.store.actions';
import { Selector, SignalSelector, Store } from 'ngss';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

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
  @Selector((state: { test: { value: number } }) => state?.test.value)
  numberSelector$: Observable<number>;

  @SignalSelector((state: { test: { value: number } }) => state?.test.value)
  numberSignalSelector$: Signal<number>;

  numberSignal$: Signal<number>;
  number$: Observable<number>;

  constructor(
    private store: Store,
  ) {
    this.number$ = this.store.select((state) => state?.test.value as number);
    this.numberSignal$ = this.store.selectSignal((state) => state?.test.value as number);
  }

  increment(): void {
    this.store.dispatch(new AddNumber(1));
  }

  incrementWithMiddleWare(): void {
    this.store.dispatch(new AddNumber(2));
  }

  decrement(): void {
    this.store.dispatch(new RemoveNumber(1));
  }

  interval(): void {
    this.store.dispatch(new IntervalAdding(1));
  }

  reset(): void {
    this.store.reset();
  }
}
