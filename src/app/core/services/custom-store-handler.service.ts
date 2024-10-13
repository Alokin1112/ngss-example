import { Injectable } from '@angular/core';
import { AddNumber, IntervalAdding, RemoveNumber } from '@app/store/testing.store.actions';
import { StoreHandler } from '@core/interfaces/store-handler.interface';
import { Store } from 'ngss';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomStoreHandlerService implements StoreHandler {

  constructor(
    private store: Store,
  ) { }

  getValue(): Observable<number> {
    return this.store.select(state => state.test.value as number);
  }

  add(val: number): void {
    this.store.dispatch(new AddNumber(val));
  }
  remove(val: number): void {
    this.store.dispatch(new RemoveNumber(val));
  }
  interval(val: number): void {
    this.store.dispatch(new IntervalAdding(val));
  }
  clear(): void {
    this.store.reset();
  }



}
