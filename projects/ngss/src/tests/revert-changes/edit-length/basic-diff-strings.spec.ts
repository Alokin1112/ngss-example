import { diffStrings } from "projects/ngss/src/lib/revert-changes/edit-length/basic-diff-strings.const";

describe('diffStrings', () => {
  it('should return no operations for identical strings', () => {
    const prev = 'hello';
    const modified = 'hello';
    const result = diffStrings(prev, modified);
    expect(result).toEqual([]);
  });

  it('should return add operations for added characters', () => {
    const prev = 'hello';
    const modified = 'hello world';
    const result = diffStrings(prev, modified);
    expect(result).toEqual([
      { type: 'add', index: 5, value: ' ' },
      { type: 'add', index: 6, value: 'w' },
      { type: 'add', index: 7, value: 'o' },
      { type: 'add', index: 8, value: 'r' },
      { type: 'add', index: 9, value: 'l' },
      { type: 'add', index: 10, value: 'd' }
    ]);
  });

  it('should return remove operations for removed characters', () => {
    const prev = 'hello world';
    const modified = 'hello';
    const result = diffStrings(prev, modified);
    expect(result).toEqual([
      { type: 'remove', index: 10, value: 'd' },
      { type: 'remove', index: 9, value: 'l' },
      { type: 'remove', index: 8, value: 'r' },
      { type: 'remove', index: 7, value: 'o' },
      { type: 'remove', index: 6, value: 'w' },
      { type: 'remove', index: 5, value: ' ' }
    ]);
  });

  it('should return replace operations for replaced characters', () => {
    const prev = 'hello';
    const modified = 'hallo';
    const result = diffStrings(prev, modified);
    expect(result).toEqual([
      { type: 'replace', index: 1, value: 'a' }
    ]);
  });

  it('should return mixed operations for complex changes', () => {
    const prev = 'hello';
    const modified = 'hallo world';
    const result = diffStrings(prev, modified);
    expect(result).toEqual([
      { type: 'replace', index: 1, value: 'a' },
      { type: 'add', index: 5, value: ' ' },
      { type: 'add', index: 6, value: 'w' },
      { type: 'add', index: 7, value: 'o' },
      { type: 'add', index: 8, value: 'r' },
      { type: 'add', index: 9, value: 'l' },
      { type: 'add', index: 10, value: 'd' }
    ]);
  });
});