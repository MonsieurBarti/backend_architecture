import type { BankAccount } from './bank-account';

export interface BankAccountReader {
	findByUserId(userId: string): Promise<BankAccount[]>;
	findById(id: string): Promise<BankAccount | null>;
}
