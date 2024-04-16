import { Middleware } from "projects/ngss/src/lib/middleware/middleware.interface";

export interface StoreAdditionalConfig {
  middlewares?: Middleware<unknown>[];
}