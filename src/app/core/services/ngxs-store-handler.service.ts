import { Injectable } from '@angular/core';
import { NgxsAddNumber, NgxsIntervalAdding, NgxsRemoveNumber } from '@app/store/ngxs/ngxs-testing.store.actions';
import { StoreHandler } from '@core/interfaces/store-handler.interface';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgxsStoreHandlerService implements StoreHandler {

  constructor(
    private store: Store
  ) { }

  getValue(): Observable<number> {
    return this.store.select(state => state.test.value as number);
  }

  add(val: number): void {
    this.store.dispatch(new NgxsAddNumber(val));
  }
  remove(val: number): void {
    this.store.dispatch(new NgxsRemoveNumber(val));
  }
  interval(val: number): void {
    this.store.dispatch(new NgxsIntervalAdding(val));
  }
  clear(): void {
    this.store.reset({
      test: {
        value: 0
      }
    });
  }



}
