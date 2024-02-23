import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActionClass, NgssComponent } from 'ngss';

@Component({
  selector: 'ds-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgssComponent]
})
export class AppComponent {
  title = 'angular-template';

  constructor() {
    const x = new Test({ name: 'dupa', age: 12 });

  }
}


class Test extends ActionClass<{ name: string, age: number }> {
  override type = 'test';
}