import { Injector, ModuleWithProviders, NgModule, Optional, Provider, ProviderToken, SkipSelf, inject } from "@angular/core";
import { DecoratorService } from "projects/ngss/src/lib/decorators/decorator.service";
import { ReducerInterface } from "projects/ngss/src/lib/reducers/reducers.interface";
import { StoreAdditionalConfig } from "projects/ngss/src/lib/store/store-additional-config.interface";
import { StoreClass } from "projects/ngss/src/lib/store/store.class.implementation";
import { Store } from 'projects/ngss/src/lib/store/store.interface';

@NgModule({

})
export class NGSSStoreModule {

  static injector: Injector;

  constructor(@Optional() @SkipSelf() parentModule: NGSSStoreModule, private injector: Injector) {
    if (parentModule) {
      throw new Error(
        '[NGSS] NGSSStore is already loaded. Import it in the AppModule only'
      );
    }
    NGSSStoreModule.injector = this.injector;
  }

  static forRoot(reducers: ProviderToken<ReducerInterface<unknown>>[], config: StoreAdditionalConfig = null): ModuleWithProviders<NGSSStoreModule> {
    return {
      ngModule: NGSSStoreModule,
      providers: [
        NgssStoreProviderFn(reducers, config),
        DecoratorService
      ]
    };
  }
}

const NgssStoreProviderFn = (reducers: ProviderToken<ReducerInterface<unknown>>[], config: StoreAdditionalConfig): Provider => ({
  provide: Store,
  useFactory: StoreFactory(reducers, config),
});

const StoreFactory = (reducers: ProviderToken<ReducerInterface<unknown>>[], config: StoreAdditionalConfig) => () => {
  return new StoreClass(reducers.map((reducer) => inject(reducer)), config);
}; 