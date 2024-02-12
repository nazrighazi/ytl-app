import { GetTransactions } from './GetTransactions';

const getTransactions = new GetTransactions();

export const transactionService = Object.freeze({
  getTransactions,
});
