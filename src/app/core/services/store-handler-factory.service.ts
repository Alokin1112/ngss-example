import { Injectable, Injector } from '@angular/core';
import { StoreActionType, StoreHandler } from '@core/interfaces/store-handler.interface';
import { CustomStoreHandlerService } from '@core/services/custom-store-handler.service';
import { NgrxStoreHandlerService } from '@core/services/ngrx-store-handler.service';
import { NgxsStoreHandlerService } from '@core/services/ngxs-store-handler.service';

@Injectable({
  providedIn: 'root'
})
export class StoreHandlerFactoryService {

  constructor(
    private injector: Injector
  ) { }


  get(type: StoreActionType): StoreHandler {
    switch (type) {
      case StoreActionType.NGXS:
        return this.injector.get(NgxsStoreHandlerService);
      case StoreActionType.CUSTOM:
        return this.injector.get(CustomStoreHandlerService);
      case StoreActionType.NGRX:
        return this.injector.get(NgrxStoreHandlerService);
      default:
        throw new Error('Invalid type');
    }
  }

}
