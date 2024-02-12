import { HttpClient } from '../HttpClient';

export class GetTransactions extends HttpClient {
  async execute() {
    try {
      const res = await this.get('https://jsonplaceholder.typicode.com/moon');
      if (!res.ok) throw new Error('Error getting transactions');
      return res.json();
    } catch (err) {
      return err;
    }
  }
}
