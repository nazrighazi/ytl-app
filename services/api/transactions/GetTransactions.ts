import { HttpClient } from '../HttpClient';

export class GetTransactions extends HttpClient {
  async execute() {
    try {
      // const res = await this.get('https://jsonplaceholder.typicode.com/moon');
      // if (!res.ok) throw new Error('Error getting transactions');
      // return res.json();

      // Mocked response
      const res = require('../../mocks/transaction-history.json');
      return res;
    } catch (err) {
      return err;
    }
  }
}
