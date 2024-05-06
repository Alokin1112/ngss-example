import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class DumbReducerTestService {

  RETURN_VALUE = 1;

  getValue(): number {
    return this.RETURN_VALUE;
  }

  getValueObservable(): Observable<number> {
    return of(this.RETURN_VALUE);
  }
}
