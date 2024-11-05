export interface RevertChangesStringStateOperations {
  op: RevertChangesStringStateOperationsType,
  char: string,
  pos: number
}

export type RevertChangesStringStateOperationsType = 'add' | 'del' | 'sub' | 'unk';