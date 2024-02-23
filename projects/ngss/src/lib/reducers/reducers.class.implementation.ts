import { ActionInterface } from "ngss";
import { ReducerInterface } from "projects/ngss/src/lib/reducers/reducers.interface";
import { BehaviorSubject, Observable } from "rxjs";


export abstract class StoreReducer<T> implements ReducerInterface<T> {
  readonly name: string;
  readonly initialValue: T;

  private state$: BehaviorSubject<T>;

  constructor() {
    this.state$ = new BehaviorSubject<T>(this.initialValue);
  }

  getState(): Observable<T> {
    return this.state$.asObservable();
  }

  reset(): void {
    this.state$.next(this.initialValue);
  }

  handleAction: <A>(action: ActionInterface<A>) => void;
}