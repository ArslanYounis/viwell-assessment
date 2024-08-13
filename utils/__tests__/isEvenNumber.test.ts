import { isEvenNumber } from '../isEvenNumber';

describe('isEvenNumber', () => {
  test('should return true if number is even', () => {
    expect(isEvenNumber(2)).toBe(true);
    expect(isEvenNumber(0)).toBe(true);
    expect(isEvenNumber(100)).toBe(true);
  });

  test('should return false if number is odd', () => {
    expect(isEvenNumber(1)).toBe(false);
    expect(isEvenNumber(3)).toBe(false);
    expect(isEvenNumber(99)).toBe(false);
  });

  test('should return false for negative odd numbers', () => {
    expect(isEvenNumber(-1)).toBe(false);
    expect(isEvenNumber(-3)).toBe(false);
  });

  test('should return true for negative even numbers', () => {
    expect(isEvenNumber(-2)).toBe(true);
    expect(isEvenNumber(-100)).toBe(true);
  });
});
