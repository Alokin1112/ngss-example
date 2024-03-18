import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddNumber, IntervalAdding, RemoveNumber } from '@app/store/testing.store.actions';
import { NgssComponent, Store } from 'ngss';
import { Observable } from 'rxjs';

@Component({
  selector: 'ds-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgssComponent]
})
export class AppComponent {
  title = 'angular-template';
  number$: Observable<number>;

  constructor(
    private store: Store
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
}