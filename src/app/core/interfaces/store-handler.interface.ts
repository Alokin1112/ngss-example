import { Observable } from "rxjs";

export interface StoreHandler {
  add(val: number): void;
  remove(val: number): void;
  interval(val: number): void;
  clear(): void;
  getValue(): Observable<number>
}

export enum StoreActionType {
  CUSTOM = 'CUSTOM',
  NGXS = 'NGXS',
  NGRX = 'NGRX',
}