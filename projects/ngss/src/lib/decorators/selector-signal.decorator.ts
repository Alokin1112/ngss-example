import { effect, signal } from "@angular/core";
import { Store } from "projects/ngss/src/lib/store/store.interface";
import { NGSSStoreModule } from "projects/ngss/src/lib/store/store.module";

export const SignalSelector = <T, S>(callback: (state: S) => T) => {
  return (target: unknown, key: string): void => {

    const value = signal<T>(null);

    setTimeout(() => {
      const store = NGSSStoreModule.injector.get(Store);
      const storeSignal = store.selectSignal(callback);
      effect(() => {
        value.set(storeSignal());
      }, { injector: NGSSStoreModule.injector, allowSignalWrites: true });
    }, 0);

    const getter = () => {
      return value;
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
