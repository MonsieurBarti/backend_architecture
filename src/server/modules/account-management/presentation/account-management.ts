import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import {
	AddBankAccountCommand,
	AddBankAccountCommandProps,
} from '../application/commands/add-bank-account/add-bank-account.command';
import {
	RemoveBankAccountCommand,
	RemoveBankAccountCommandProps,
} from '../application/commands/remove-bank-account/remove-bank-account.command';
import { AddBankAccountCommandHandler } from '../application/commands/add-bank-account/add-bank-account.command';
import { RemoveBankAccountCommandHandler } from '../application/commands/remove-bank-account/remove-bank-account.command';
import { accountManagementContainer } from '../account-management.container';
import { ACCOUNT_MANAGEMENT_TOKENS } from '../account-management.tokens';
import {
	GetAllBankAccountQuery,
	GetAllBankAccountQueryHandler,
} from '../application/queries/get-all-accounts/get-all-accounts.query';

export const accountManagementRouter = createTRPCRouter({
	addBankAccount: protectedProcedure
		.input(AddBankAccountCommandProps.omit({ userId: true }))
		.mutation(async ({ input, ctx }) => {
			const userId = ctx.session.user.id;
			const addBankAccountCommandHandler = accountManagementContainer.get<AddBankAccountCommandHandler>(
				ACCOUNT_MANAGEMENT_TOKENS.ADD_BANK_ACCOUNT_COMMAND_HANDLER,
			);
			const bankAccount = await addBankAccountCommandHandler.execute(
				new AddBankAccountCommand({ ...input, userId }),
			);

			return bankAccount;
		}),
	removeBankAccount: protectedProcedure
		.input(RemoveBankAccountCommandProps.omit({ userId: true }))
		.mutation(async ({ input, ctx }) => {
			const userId = ctx.session.user.id;
			const removeBankAccountCommandHandler = accountManagementContainer.get<RemoveBankAccountCommandHandler>(
				ACCOUNT_MANAGEMENT_TOKENS.REMOVE_BANK_ACCOUNT_COMMAND_HANDLER,
			);
			return removeBankAccountCommandHandler.execute(new RemoveBankAccountCommand({ ...input, userId }));
		}),
	getAllBankAccounts: protectedProcedure.query(async ({ ctx }) => {
		const userId = ctx.session.user.id;
		const getAllBankAccountQueryHandler = accountManagementContainer.get<GetAllBankAccountQueryHandler>(
			ACCOUNT_MANAGEMENT_TOKENS.GET_ALL_BANK_ACCOUNT_QUERY_HANDLER,
		);
		return getAllBankAccountQueryHandler.execute(new GetAllBankAccountQuery({ userId }));
	}),
});
