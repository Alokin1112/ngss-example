import { inject } from "@angular/core";
import { DecoratorService } from "projects/ngss/src/lib/decorators/decorator.service";
import { Store } from "projects/ngss/src/lib/store/store.interface";

export const Selector = () => {
  return (target: unknown, key: string): void => {

    let value: any;

    // console.log(DecoratorService.getInjector())

    const getter = () => {
      return (value as string) + " (modified)";
    };

    const setter = (newVal: unknown) => {
      // Modify the value before assigning it
      value = newVal;
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
};