export class NgxsAddNumber {
  static readonly type = '[TestStore] AddNumber';

  constructor(public value: number) { }
}

export class NgxsRemoveNumber {
  static readonly type = '[TestStore] RemoveNumber';

  constructor(public value: number) { }
}

export class NgxsIntervalAdding {
  static readonly type = '[TestStore] IntervalAdding';

  constructor(public value: number) { }
}

export class NgxsClearNumber {
  static readonly type = '[TestStore] ClearNumber';
}