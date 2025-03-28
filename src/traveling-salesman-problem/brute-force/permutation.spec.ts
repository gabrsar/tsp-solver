import { generatePermutations } from './permutation';

describe('generatePermutations', () => {
  it('should yield empty array for empty input', () => {
    const result = Array.from(generatePermutations([]));
    expect(result).toEqual([[]]);
  });

  it('should yield single item for array of one element', () => {
    const result = Array.from(generatePermutations([42]));
    expect(result).toEqual([[42]]);
  });

  it('should yield two permutations for array of two elements', () => {
    const result = Array.from(generatePermutations([1, 2]));
    expect(result).toEqual([
      [1, 2],
      [2, 1],
    ]);
  });

  it('should yield one element per call to avoid memory exhaustion', () => {
    const generator = generatePermutations([1, 2, 3]);
    expect(generator.next()).toEqual({ done: false, value: [1, 2, 3] });
    expect(generator.next()).toEqual({ done: false, value: [1, 3, 2] });
  });

  it('should yield all 6 permutations for array of three elements', () => {
    const result = Array.from(generatePermutations([1, 2, 3]));
    const expected = [
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 2, 1],
      [3, 1, 2],
    ];
    expect(result).toHaveLength(6);
    expect(result).toEqual(expect.arrayContaining(expected));
  });

  it('should not modify the input array', () => {
    const original = [1, 2, 3];
    const copy = [...original];
    Array.from(generatePermutations(original));
    expect(original).toEqual(copy);
  });
});
