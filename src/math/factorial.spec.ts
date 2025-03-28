import factorial from './factorial';

describe('factorial function', () => {
  it('0! === 1', () => {
    expect(factorial(0)).toBe(1);
  });

  it('1! === 1', () => {
    expect(factorial(1)).toBe(1);
  });

  it('should return correct factorial for positive numbers', () => {
    expect(factorial(5)).toBe(120); // 5! = 5 * 4 * 3 * 2 * 1 = 120
    expect(factorial(3)).toBe(6); // 3! = 3 * 2 * 1 = 6
  });

  it('should throw error for decimal inputs', () => {
    expect(() => factorial(Math.PI)).toThrow('This method only supports integers.');
  });

  it('it works for very big numbers, but respect JS Precision limits.', () => {
    expect(factorial(170)).toBe(7.257415615308004e306);
    expect(() => factorial(171)).toThrow('This operation will cause a numeric overflow.');
  });

  it('should throw an error for negative numbers', () => {
    expect(() => factorial(-1)).toThrow();
  });
});
