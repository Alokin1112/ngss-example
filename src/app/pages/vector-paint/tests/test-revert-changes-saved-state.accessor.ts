import { RevertChangesSavedStateService } from "ngss";

export interface RevertChangesSavedStateAccessor<T> {
  revertChangesService: {
    stateService: RevertChangesSavedStateService<T>;
  };
}