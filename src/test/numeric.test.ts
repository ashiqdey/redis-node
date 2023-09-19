import { sum, subtract } from '../service/numeric';

test('add two number', () => {
  expect(sum(1, 2)).toBe(3);
});

test('subtract two number', () => {
  expect(subtract(2, 1)).toBe(1);
});

test('subtract two number', () => {
  expect(subtract(2, 1)).toBe(1);
});

