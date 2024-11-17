import { RevertChangesStringStateOperations, RevertChangesStringStateOperationsType } from "projects/ngss/src/lib/revert-changes/revert-changes-string-state-operations.interface";

const operationsActions: Record<RevertChangesStringStateOperationsType, (characters: string[], action: RevertChangesStringStateOperations) => void> = {

  "add": (characters, action) => {
    characters[action?.pos] = `${action?.char}${characters[action?.pos]}`;
  },
  "del": (characters, action) => {
    const length = action?.char?.length || 0;
    for (let i = 0; i < length; i++) {
      characters[action?.pos + i] = '';
    }
  },
  "sub": (characters, action) => {
    characters[action?.pos] = action?.char;
    const length = action?.char?.length || 0;
    for (let i = 0; i < length; i++) {
      characters[action?.pos + i] = action?.char[i];
    }
  },
  "unk": (characters, action) => {
    console.error(`Unknown operation: ${action?.op}`);
  }
}

export const stringStateChangesReverter = <T>(state: T, changes: RevertChangesStringStateOperations[]): T => {
  const characters = JSON.stringify(state).split('');
  changes.reverse().forEach((change) => {
    operationsActions[change.op](characters, change);
  });

  return JSON.parse(characters.join('')) as T;
};