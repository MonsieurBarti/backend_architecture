import { InMemoryBankAccountRepository } from '../../../infrastructure/persistence/bank-account/in-memory-bank-account.repository';
import { AddBankAccountCommand, AddBankAccountCommandHandler } from './add-bank-account.command';

describe('AddBankAccountCommandHandler', () => {
	const bankAccountRepository = new InMemoryBankAccountRepository();
	const handler = new AddBankAccountCommandHandler(bankAccountRepository);

	beforeEach(() => {
		bankAccountRepository.clear();
	});

	it('should add a bank account', async () => {
		const command = new AddBankAccountCommand({
			name: 'BOURSORAMA',
			iban: 'FR1234567890',
			bic: 'BOURSORAMA',
			userId: crypto.randomUUID(),
		});
		await handler.execute(command);
		const bankAccounts = bankAccountRepository.findAll();
		expect(bankAccounts).toHaveLength(1);
	});
});
