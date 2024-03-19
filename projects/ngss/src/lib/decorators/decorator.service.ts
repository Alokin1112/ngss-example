import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DecoratorService {

  private static injector: Injector;

  constructor(
    private injector: Injector
  ) {
    DecoratorService.injector = injector;
  }

  static getInjector(): Injector {
    // if (!DecoratorService.injector) {
    //   throw new Error("Decorator service not initialized");
    // }

    return DecoratorService.injector;
  }

}
