import { BankAccount } from '../../../domain/bank-account/bank-account';
import { InMemoryBankAccountRepository } from '../../../infrastructure/persistence/bank-account/in-memory-bank-account.repository';
import { RemoveBankAccountCommand, RemoveBankAccountCommandHandler } from './remove-bank-account.command';

describe('RemoveBankAccountCommandHandler', () => {
	const bankAccountRepository = new InMemoryBankAccountRepository();
	const handler = new RemoveBankAccountCommandHandler(bankAccountRepository);

	beforeEach(() => {
		bankAccountRepository.clear();
	});

	it('should remove a bank account', async () => {
		const bankAccount = BankAccount.create({
			name: 'BOURSORAMA',
			iban: 'FR1234567890',
			bic: 'BOURSORAMA',
			userId: crypto.randomUUID(),
		});
		await bankAccountRepository.save(bankAccount);

		const command = new RemoveBankAccountCommand({
			id: bankAccount.id,
		});
		await handler.execute(command);
		const bankAccounts = bankAccountRepository.findAll();
		expect(bankAccounts).toHaveLength(0);
	});
});
