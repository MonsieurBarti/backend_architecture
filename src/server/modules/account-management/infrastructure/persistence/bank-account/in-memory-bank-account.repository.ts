import { injectable } from 'inversify';
import type { BankAccount } from '../../../domain/bank-account/bank-account';
import type { BankAccountRepository } from '../../../domain/bank-account/bank-account.repository';

@injectable()
export class InMemoryBankAccountRepository implements BankAccountRepository {
	private readonly bankAccounts: Map<string, BankAccount> = new Map();

	public async save(bankAccount: BankAccount): Promise<void> {
		this.bankAccounts.set(bankAccount.id, bankAccount);
	}

	public async remove(id: string): Promise<void> {
		this.bankAccounts.delete(id);
	}

	public findAll(): BankAccount[] {
		return Array.from(this.bankAccounts.values());
	}

	public clear(): void {
		this.bankAccounts.clear();
	}
}
