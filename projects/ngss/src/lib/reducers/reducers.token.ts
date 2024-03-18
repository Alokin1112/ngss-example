import { InjectionToken, ProviderToken } from "@angular/core";
import { ReducerInterface } from "projects/ngss/src/lib/reducers/reducers.interface";

export const REDUCERS_LIST = new InjectionToken<ProviderToken<ReducerInterface<unknown>>[]>('NGSS_REDUCERS_LIST');