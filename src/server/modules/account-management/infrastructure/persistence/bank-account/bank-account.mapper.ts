import { PgInsertValue, PgSelectBase } from 'drizzle-orm/pg-core';
import { BankAccount } from '../../../domain/bank-account/bank-account';
import { bankAccount } from '@/server/db/schema';

export class BankAccountMapper {
	public static toPersistence(entity: BankAccount): PgInsertValue<typeof bankAccount> {
		return {
			id: entity.id,
			name: entity.name,
			userId: entity.userId,
			iban: entity.iban,
			bic: entity.bic,
		};
	}
}
