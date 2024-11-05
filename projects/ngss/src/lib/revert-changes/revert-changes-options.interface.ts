import { ActionHandlerAction } from "projects/ngss/src/lib/actions/actions.interface";

export type RevertChangesOptions = RevertChangesOptionsByDate | RevertChangesOptionsByActionType | RevertChangesOptionsByNumOfActions;

export type RevertChangesOptionsByDate = { byDate: Date };
export type RevertChangesOptionsByActionType = { byActionType: ActionHandlerAction<unknown>, numOfActions: number };
export type RevertChangesOptionsByNumOfActions = { byNumOfActions: number };