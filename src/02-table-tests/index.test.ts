import { simpleCalculator, Action } from './index';

describe('simpleCalculator', () => {
  const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Subtract, expected: 0 },
    { a: 3, b: 2, action: Action.Multiply, expected: 6 },
    { a: 4, b: 2, action: Action.Divide, expected: 2 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  ];

  testCases.forEach(({ a, b, action, expected }) => {
    test(`should perform ${action} operation on ${a} and ${b} and return ${expected}`, () => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    });
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: '2', b: 3, action: Action.Add });
    expect(result).toBeNull();
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: '123' }); // Invalid action
    expect(result).toBeNull();
  });
});
