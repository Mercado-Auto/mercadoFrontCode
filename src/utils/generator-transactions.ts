import {add, sub} from 'date-fns';
import Transaction, {TransactionOperation} from "../interfaces/transaction";


export function generatorTransactions(total: number = 10, closed = false, allpaid = false, onlyDebit = false): Transaction[] {
  const startAt = total * 7;
  const now = new Date();
  const startDate = sub(now, {days: startAt});
  let transactions: Transaction[] = [];

  for (let i = 0; i < total; i++) {
    const _len = Math.floor(Math.random() * 30) + 1;
    const bucket: Transaction[] = [];

    const startDateBucket = add(startDate, {days: (i * 7)});
    const finalDate = add(startDate, {days: ((i + 1) * 7)})
    for (let t = 0; t < _len; t++) {
      const randDay = Math.floor(Math.random() * 7) + 1;
      const itemDate = add(startDateBucket, {days: randDay});
      const item: Transaction = {
        ...({ _itemDate: itemDate }) as unknown as any,
        amount: Math.floor(Math.random() * 5000) + 1,
        id: crypto.randomUUID(),
        createdAt: itemDate.toString(),
        updatedAt: itemDate.toString(),
        operation: TransactionOperation.CREDIT,
        reseller: { name: 'reseller-name' } as unknown as any,
        reseller_id: crypto.randomUUID(),
        processed: false
      };
      bucket.push(item);
    }

    const itemBucket: Transaction = {
      ...({ _itemDate: finalDate }) as unknown as any,
      amount: bucket.reduce((amount, item) => amount + item.amount, 0),
      id: crypto.randomUUID(),
      createdAt: finalDate.toString(),
      updatedAt: finalDate.toString(),
      operation: TransactionOperation.DEBIT,
      reseller: { name: 'reseller-name' } as unknown as any,
      reseller_id: crypto.randomUUID(),
      processed: allpaid ? true : Math.floor(Math.random() * 2) % 2 === 0
    };

    bucket.unshift(itemBucket);

    transactions = [
      ...bucket,
      ...transactions,
    ].sort((a: any, b: any) => b._itemDate - a._itemDate)
  }

  if (!closed) {
    transactions.shift();
  }

  return onlyDebit ? transactions.filter(i => i.operation === TransactionOperation.DEBIT) : transactions;
}
