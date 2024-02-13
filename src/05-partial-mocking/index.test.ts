import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule = jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
    mockOne: jest.fn(originalModule.mockOne),
    mockTwo: jest.fn(originalModule.mockTwo),
    mockThree: jest.fn(originalModule.mockThree),
  };
});

describe('partial mocking', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    expect(mockOne).not.toHaveBeenCalled();
    expect(mockTwo).not.toHaveBeenCalled();
    expect(mockThree).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();
    unmockedFunction();
    expect(consoleLogMock).toHaveBeenCalled();
    consoleLogMock.mockRestore();
  });
});
