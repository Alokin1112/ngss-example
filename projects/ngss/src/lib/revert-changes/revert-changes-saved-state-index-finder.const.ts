
import { RevertChangesOptions, RevertChangesOptionsByActionType, RevertChangesOptionsByDate, RevertChangesOptionsByNumOfActions, } from "projects/ngss/src/lib/revert-changes/revert-changes-options.interface";
import { RevertChangesSavedState } from "projects/ngss/src/lib/revert-changes/revert-changes-service.interface";

/**
 * @param savedState list of saved states
 * @param options options to find saved state
 * @returns index of found saved state, -1 if not found
 */

export const getSavedStateIndex = <T>(savedState: RevertChangesSavedState<T>[], options: RevertChangesOptions): number => {

  if ((options as RevertChangesOptionsByDate)?.byDate) {
    return getSavedStateByDate(savedState, options as RevertChangesOptionsByDate);
  } else if ((options as RevertChangesOptionsByActionType)?.byActionType) {
    return getSavedStateByActionType(savedState, options as RevertChangesOptionsByActionType);
  } else if ((options as RevertChangesOptionsByNumOfActions)?.byNumOfActions) {
    return getSavedStateByNumOfActions(savedState, options as RevertChangesOptionsByNumOfActions);
  }

  return -1;
};

const getSavedStateByDate = <T>(savedState: RevertChangesSavedState<T>[], options: RevertChangesOptionsByDate): number => {
  if (!savedState || savedState.length === 0 || !options?.byDate) {
    return -1;
  }
  return savedState.findIndex((state) => state?.dateTime >= options?.byDate);
};

const getSavedStateByActionType = <T>(savedState: RevertChangesSavedState<T>[], options: RevertChangesOptionsByActionType): number => {
  if (!savedState || savedState.length === 0 || !options?.byActionType) {
    return -1;
  }
  let actionsCounter = 0;

  const action = new options.byActionType();

  const reversedIndex = [...savedState].reverse().findIndex((state) => {
    if (state?.actionType === action.getType()) {
      actionsCounter++;
      if (actionsCounter === options?.numOfActions) {
        return true;
      }
    }
    return false;
  });

  return reversedIndex === -1 ? -1 : savedState.length - reversedIndex - 1;
};

const getSavedStateByNumOfActions = <T>(savedState: RevertChangesSavedState<T>[], options: RevertChangesOptionsByNumOfActions): number => {

  if (!savedState || savedState.length === 0 || !options?.byNumOfActions) {
    return -1;
  }

  if (savedState.length <= options?.byNumOfActions) {
    return 0;
  }

  return savedState.length - options?.byNumOfActions - 1;
};