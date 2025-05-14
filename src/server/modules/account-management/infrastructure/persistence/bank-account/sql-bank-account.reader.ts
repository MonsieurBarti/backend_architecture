import { injectable } from 'inversify';
import type { BankAccountReader } from '../../../domain/bank-account/bank-account.reader';
import { BankAccount } from '../../../domain/bank-account/bank-account';
import { db } from '@/server/db';
import { bankAccount } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

@injectable()
export class SqlBankAccountReader implements BankAccountReader {
	public async findByUserId(userId: string): Promise<BankAccount[]> {
		const bankAccounts = await db.query.bankAccount.findMany({ where: eq(bankAccount.userId, userId) });

		return bankAccounts.map(bankAccount => BankAccount.create(bankAccount));
	}

	public async findById(id: string): Promise<BankAccount | null> {
		const account = await db.query.bankAccount.findFirst({ where: eq(bankAccount.id, id) });

		return account ? BankAccount.create(account) : null;
	}
}
