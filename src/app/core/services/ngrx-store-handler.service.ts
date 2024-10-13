import { Injectable } from '@angular/core';
import { NgrxAddNumber, NgrxIntervalAdding, NgrxRemoveNumber } from '@app/store/ngrx/ngrx-testing.store.actions';
import { testReducerValue } from '@app/store/ngrx/ngxs-testing.store.reducer';
import { StoreHandler } from '@core/interfaces/store-handler.interface';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgrxStoreHandlerService implements StoreHandler {

  constructor(
    private store: Store,
  ) { }

  add(val: number): void {
    this.store.dispatch(NgrxAddNumber({ value: val }));
  }

  remove(val: number): void {
    this.store.dispatch(NgrxRemoveNumber({ value: val }));
  }

  interval(val: number): void {
    this.store.dispatch(NgrxIntervalAdding({ value: val }));
  }
  clear(): void {
    this.store.select(testReducerValue).pipe(
      take(1)
    ).subscribe(state => {
      this.store.dispatch(NgrxRemoveNumber({ value: state }));
    });
  }

  getValue(): Observable<number> {
    console.log(this.store)
    return this.store.select(testReducerValue);
  }

}
