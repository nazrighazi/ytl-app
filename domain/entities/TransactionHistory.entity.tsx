export type Transaction = {
  status: 'Success' | 'Error' | 'Pending';
  transaction_id: string;
  date: string;
  description: string;
  amount: string;
  currency: string;
  category: string;
  type: 'debit' | 'credit';
  transaction_status: 'success' | 'failed' | 'pending';
  transaction_type: 'deposit' | 'withdraw';
  merchant: string;
  card_number: string;
};

export type TransactionsResponse = {
  transactions: Transaction[];
};
