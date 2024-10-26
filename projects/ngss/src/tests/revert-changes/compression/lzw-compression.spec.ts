import { lzw_encode, lzw_decode } from 'projects/ngss/src/lib/revert-changes/compression/lzw-compression.const';

describe('LZW Compression', () => {
  it('should encode and decode a string correctly', () => {
    const original = "TOBEORNOTTOBEORTOBEORNOT";
    const encoded = lzw_encode(original);
    const decoded = lzw_decode<string>(encoded);
    expect(decoded).toBe(original);
  });

  it('should encode and decode an object correctly', () => {
    const original = { name: "John Doe", age: 30, city: "New York" };
    const encoded = lzw_encode(original);
    const decoded = lzw_decode<typeof original>(encoded);
    expect(decoded).toEqual(original);
  });

  it('should encode and decode an array correctly', () => {
    const original = [1, 2, 3, 4, 5];
    const encoded = lzw_encode(original);
    const decoded = lzw_decode<typeof original>(encoded);
    expect(decoded).toEqual(original);
  });
});