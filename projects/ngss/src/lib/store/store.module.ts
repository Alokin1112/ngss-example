import { ModuleWithProviders, NgModule, Optional, Provider, ProviderToken, SkipSelf, inject } from "@angular/core";
import { DecoratorService } from "projects/ngss/src/lib/decorators/decorator.service";
import { ReducerInterface } from "projects/ngss/src/lib/reducers/reducers.interface";
import { REDUCERS_LIST } from "projects/ngss/src/lib/reducers/reducers.token";
import { StoreClass } from "projects/ngss/src/lib/store/store.class.implementation";
import { Store } from 'projects/ngss/src/lib/store/store.interface';

@NgModule({

})
export class NGSSStoreModule {

  constructor(@Optional() @SkipSelf() parentModule: NGSSStoreModule) {
    if (parentModule) {
      throw new Error(
        'NGSSStore is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(reducers: ProviderToken<ReducerInterface<unknown>>[]): ModuleWithProviders<NGSSStoreModule> {
    return {
      ngModule: NGSSStoreModule,
      providers: [
        NgssStoreProviderFn(reducers),
        DecoratorService
      ]
    };
  }
}

export const NgssStoreProviderFn = (reducers: ProviderToken<ReducerInterface<unknown>>[]): Provider => ({
  provide: Store,
  useFactory: StoreFactory(reducers),
});

export const StoreFactory = (reducers: ProviderToken<ReducerInterface<unknown>>[]) => () => {
  return new StoreClass(reducers.map((reducer) => inject(reducer)));
}; 