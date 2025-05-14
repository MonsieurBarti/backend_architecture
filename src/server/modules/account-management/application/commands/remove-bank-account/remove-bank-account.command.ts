import { z } from 'zod';
import { inject, injectable } from 'inversify';
import { ACCOUNT_MANAGEMENT_TOKENS } from '../../../account-management.tokens';
import type { BankAccountRepository } from '../../../domain/bank-account/bank-account.repository';
import { BankAccountNotFoundError } from '../../../domain/errors/account-management.errors';
import { TrackCommand } from '../../../../../shared/decorators/track-command.decorator';

export const RemoveBankAccountCommandProps = z.object({
	id: z.string().uuid(),
	userId: z.string().uuid(),
	origin: z.string().default('SERVER'),
});
export type RemoveBankAccountCommandProps = z.infer<typeof RemoveBankAccountCommandProps>;

export class RemoveBankAccountCommand {
	constructor(public readonly props: RemoveBankAccountCommandProps) {}
}

@injectable()
export class RemoveBankAccountCommandHandler {
	constructor(
		@inject(ACCOUNT_MANAGEMENT_TOKENS.BANK_ACCOUNT_REPOSITORY)
		private readonly bankAccountRepository: BankAccountRepository,
	) {}

	@TrackCommand('BANK_ACCOUNT')
	public async execute({ props }: RemoveBankAccountCommand): Promise<void> {
		const bankAccount = await this.bankAccountRepository.findById(props.id);
		if (!bankAccount || bankAccount.userId !== props.userId) {
			throw new BankAccountNotFoundError(props.id, props.userId);
		}

		await this.bankAccountRepository.remove(props.id);
	}
}
