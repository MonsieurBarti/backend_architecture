import { injectable } from 'inversify';
import type { BankAccountRepository } from '../../../domain/bank-account/bank-account.repository';
import { db } from '@/server/db';
import { bankAccount } from '@/server/db/schema';
import { BankAccount } from '../../../domain/bank-account/bank-account';
import { eq } from 'drizzle-orm';
import { BankAccountMapper } from './bank-account.mapper';

@injectable()
export class SqlBankAccountRepository implements BankAccountRepository {
	public async save(bankAccountEntity: BankAccount): Promise<void> {
		const values = BankAccountMapper.toPersistence(bankAccountEntity);
		await db.insert(bankAccount).values(values);
	}

	public async remove(id: string): Promise<void> {
		await db.delete(bankAccount).where(eq(bankAccount.id, id));
	}

	public async findById(id: string): Promise<BankAccount | null> {
		const account = await db.query.bankAccount.findFirst({ where: eq(bankAccount.id, id) });

		return account ? BankAccount.create(account) : null;
	}
}
