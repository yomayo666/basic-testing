import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from './index';
import { readFile } from 'fs/promises';
import fs from 'fs';

jest.mock('fs/promises');

describe('readFileAsynchronously', () => {
  test('should call readFile with pathToFile', async () => {
    const pathToFile = 'testfile.txt';
    const fileContent = 'File content';

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(fileContent);

    const result = await readFileAsynchronously(pathToFile);
    expect(readFile).toHaveBeenCalledWith(expect.stringContaining(pathToFile));
    expect(result).toEqual(fileContent);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'nonexistentfile.txt';

    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });
});

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout - 1);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and interval', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval * 3);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});
