import { effect } from "@angular/core";
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from "projects/ngss/src/lib/store/store.interface";
import { NGSSStoreModule } from "projects/ngss/src/lib/store/store.module";
import { ReplaySubject } from "rxjs";

export const Selector = <T, S>(callback: (state: S) => T) => {
  return (target: unknown, key: string): void => {

    const value = new ReplaySubject<T>(1);

    setTimeout(() => {
      const store = NGSSStoreModule.injector.get(Store);
      const signal = toSignal(store.select(callback), { injector: NGSSStoreModule.injector });
      effect(() => {
        value.next(signal());
      }, { injector: NGSSStoreModule.injector });
    }, 0);

    const getter = () => {
      return value.asObservable();
    };

    const setter = (newVal: unknown) => {
      throw new Error('[NGSS] Cannot set a selector value');
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
};