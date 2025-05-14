import { z } from 'zod';
import { inject, injectable } from 'inversify';
import { ACCOUNT_MANAGEMENT_TOKENS } from '../../../account-management.tokens';
import type { BankAccountRepository } from '../../../domain/bank-account/bank-account.repository';
import { BankAccount } from '../../../domain/bank-account/bank-account';
import { TrackCommand } from '../../../../../shared/decorators/track-command.decorator';

export const AddBankAccountCommandProps = z.object({
	name: z.enum(['BOURSORAMA', 'TRADE_REPUBLIC']),
	iban: z.string(),
	bic: z.string(),
	userId: z.string().uuid(),
	origin: z.string().default('SERVER'),
});
export type AddBankAccountCommandProps = z.infer<typeof AddBankAccountCommandProps>;

export class AddBankAccountCommand {
	constructor(public readonly props: AddBankAccountCommandProps) {}
}

@injectable()
export class AddBankAccountCommandHandler {
	constructor(
		@inject(ACCOUNT_MANAGEMENT_TOKENS.BANK_ACCOUNT_REPOSITORY)
		private readonly bankAccountRepository: BankAccountRepository,
	) {}

	@TrackCommand('BANK_ACCOUNT')
	public async execute({ props }: AddBankAccountCommand): Promise<BankAccount> {
		const bankAccount = BankAccount.create(props);
		await this.bankAccountRepository.save(bankAccount);

		return bankAccount;
	}
}
