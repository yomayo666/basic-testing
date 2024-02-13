import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const values = [1, 2, 3, 4, 5];
    const linkedList = generateLinkedList(values);

    let currentNode = linkedList;
    for (const value of values) {
      expect(currentNode.value).toBe(value);
      currentNode = currentNode.next!;
    }
    expect(currentNode).toBeNull();
  });

  test('should generate linked list from values 2', () => {
    const values = ['a', 'b', 'c', 'd', 'e'];
    const linkedList = generateLinkedList(values);

    expect(linkedList).toMatchSnapshot();
  });
});
