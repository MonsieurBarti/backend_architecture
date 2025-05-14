import type { BankAccount } from './bank-account';

export interface BankAccountRepository {
	save(bankAccount: BankAccount): Promise<void>;
	remove(id: string): Promise<void>;
	findById(id: string): Promise<BankAccount | null>;
}
