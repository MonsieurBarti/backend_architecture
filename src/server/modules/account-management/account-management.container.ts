import 'reflect-metadata';

import { Container } from 'inversify';
import { ACCOUNT_MANAGEMENT_TOKENS } from './account-management.tokens';
import { SqlBankAccountReader } from './infrastructure/persistence/bank-account/sql-bank-account.reader';
import { SqlBankAccountRepository } from './infrastructure/persistence/bank-account/sql-bank-account.repository';
import { AddBankAccountCommandHandler } from './application/commands/add-bank-account/add-bank-account.command';
import { RemoveBankAccountCommandHandler } from './application/commands/remove-bank-account/remove-bank-account.command';
import { GetAllBankAccountQueryHandler } from './application/queries/get-all-accounts/get-all-accounts.query';

const accountManagementContainer = new Container();

accountManagementContainer
	.bind(ACCOUNT_MANAGEMENT_TOKENS.BANK_ACCOUNT_REPOSITORY)
	.to(SqlBankAccountRepository)
	.inSingletonScope();
accountManagementContainer
	.bind(ACCOUNT_MANAGEMENT_TOKENS.BANK_ACCOUNT_READER)
	.to(SqlBankAccountReader)
	.inSingletonScope();
accountManagementContainer
	.bind(ACCOUNT_MANAGEMENT_TOKENS.ADD_BANK_ACCOUNT_COMMAND_HANDLER)
	.to(AddBankAccountCommandHandler)
	.inSingletonScope();
accountManagementContainer
	.bind(ACCOUNT_MANAGEMENT_TOKENS.REMOVE_BANK_ACCOUNT_COMMAND_HANDLER)
	.to(RemoveBankAccountCommandHandler)
	.inSingletonScope();
accountManagementContainer
	.bind(ACCOUNT_MANAGEMENT_TOKENS.GET_ALL_BANK_ACCOUNT_QUERY_HANDLER)
	.to(GetAllBankAccountQueryHandler)
	.inSingletonScope();

export { accountManagementContainer };
