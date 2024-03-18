import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddNumber, RemoveNumber } from '@app/store/testing.store.actions';
import { ActionClass, NgssComponent, Store } from 'ngss';

@Component({
  selector: 'ds-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgssComponent]
})
export class AppComponent {
  title = 'angular-template';

  constructor(
    private store: Store
  ) {
    this.store.select((state) => state?.test.value as number).subscribe(console.log)
    this.store.dispatch(new RemoveNumber(1));
  }
}