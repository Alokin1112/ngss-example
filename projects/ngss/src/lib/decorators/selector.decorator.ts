import { Store } from "projects/ngss/src/lib/store/store.interface";
import { NGSSStoreModule } from "projects/ngss/src/lib/store/store.module";
import { Observable } from "rxjs";

export const Selector = <T, S>(callback: (state: S) => T) => {
  return (target: unknown, key: string): void => {

    let value: Observable<T>;

    setTimeout(() => {
      const store = NGSSStoreModule.injector.get(Store);
      value = store.select(callback);
    }, 0);

    const getter = () => {
      return value;
    };

    const setter = (newVal: unknown) => {
      // Modify the value before assigning it
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