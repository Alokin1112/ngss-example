import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class DumbReducerTestService {

  static RETURN_VALUE = 1;

  getValue(): number {
    return DumbReducerTestService.RETURN_VALUE;
  }

  getValueObservable(): Observable<number> {
    return of(DumbReducerTestService.RETURN_VALUE);
  }
}
