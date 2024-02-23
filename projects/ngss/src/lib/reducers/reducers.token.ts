import { InjectionToken } from "@angular/core";
import { ReducerInterface } from "projects/ngss/src/lib/reducers/reducers.interface";

export const REDUCERS_LIST = new InjectionToken<ReducerInterface<any>[]>('NGSS_REDUCERS_LIST');