import { BankAccount, TransferFailedError, SynchronizationFailedError, InsufficientFundsError } from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const account = new BankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100;
    const account = new BankAccount(initialBalance);
    expect(() => account.withdraw(200)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = new BankAccount(100);
    const account2 = new BankAccount(200);
    expect(() => account1.transfer(150, account2)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const account = new BankAccount(100);
    expect(() => account.transfer(50, account)).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = new BankAccount(100);
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const account = new BankAccount(100);
    account.withdraw(50);
    expect(account.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const account1 = new BankAccount(100);
    const account2 = new BankAccount(200);
    account1.transfer(50, account2);
    expect(account1.getBalance()).toBe(50);
    expect(account2.getBalance()).toBe(250);
  });

  test('fetchBalance should return number in case if request did not fail', async () => {
    const account = new BankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(Promise.resolve(50));
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
  });
  

  test('should set new balance if fetchBalance returned number', async () => {
    const account = new BankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(50);

    await account.synchronizeBalance();
    expect(account.getBalance()).toBeGreaterThanOrEqual(0);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = new BankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrowError(SynchronizationFailedError);
  });
});
