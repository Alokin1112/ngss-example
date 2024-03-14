import { Store } from 'projects/ngss/src/lib/store/store.interface';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from "@angular/core";
import { ReducerInterface } from "projects/ngss/src/lib/reducers/reducers.interface";
import { REDUCERS_LIST } from "projects/ngss/src/lib/reducers/reducers.token";
import { StoreClass } from "projects/ngss/src/lib/store/store.class.implementation";

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

  static forRoot(reducers: ReducerInterface<any>[]): ModuleWithProviders<NGSSStoreModule> {
    return {
      ngModule: NGSSStoreModule,
      providers: [
        {
          provide: Store,
          useClass: StoreClass,
          deps: [
            {
              provide: REDUCERS_LIST,
              useValue: reducers,
            }
          ]
        },
      ]
    };
  }
}