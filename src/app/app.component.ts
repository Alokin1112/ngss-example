import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddNumber, IntervalAdding, RemoveNumber } from '@app/store/testing.store.actions';
import { NgssComponent, Selector, Store } from 'ngss';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'ds-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgssComponent]
})
export class AppComponent {
  @Selector((state: { test: { value: number } }) => state?.test.value)
  title$: Observable<number>;

  number$: Observable<number>;

  constructor(
    private store: Store,
  ) {
    this.number$ = this.store.select((state) => state?.test.value as number);
  }

  increment(): void {
    this.store.dispatch(new AddNumber(1));
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