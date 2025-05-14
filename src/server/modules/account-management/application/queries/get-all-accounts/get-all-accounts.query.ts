import { z } from 'zod';
import { inject, injectable } from 'inversify';
import { ACCOUNT_MANAGEMENT_TOKENS } from '../../../account-management.tokens';
import type { BankAccountReader } from '../../../domain/bank-account/bank-account.reader';
import { BankAccountDto } from '../../../domain/bank-account/bank-account';

export const GetAllBankAccountQueryProps = z.object({
	userId: z.string().uuid(),
});
export type GetAllBankAccountQueryProps = z.infer<typeof GetAllBankAccountQueryProps>;

export class GetAllBankAccountQuery {
	constructor(public readonly props: GetAllBankAccountQueryProps) {}
}

@injectable()
export class GetAllBankAccountQueryHandler {
	constructor(
		@inject(ACCOUNT_MANAGEMENT_TOKENS.BANK_ACCOUNT_READER)
		private readonly bankAccountReader: BankAccountReader,
	) {}

	public async execute({ props }: GetAllBankAccountQuery): Promise<BankAccountDto[]> {
		const bankAccounts = await this.bankAccountReader.findByUserId(props.userId);
		return bankAccounts.map(account => account.dto());
	}
}
