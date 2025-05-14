import { relations, sql } from 'drizzle-orm';
import { timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { index, pgEnum, pgTableCreator, primaryKey } from 'drizzle-orm/pg-core';
import type { AdapterAccount } from 'next-auth/adapters';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(name => `backend_architecture_${name}`);

export const expenseTypeEnum = pgEnum('expense_type', [
	'GROCERIES',
	'UTILITIES',
	'TRANSPORTATION',
	'ENTERTAINMENT',
	'INVESTMENTS',
	'HEALTH',
	'SPORTS',
	'LOAN',
	'TRANSFER',
	'OTHER',
]);

export const timestampFields = {
	createdAt: timestamp({ mode: 'date', withTimezone: true })
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: timestamp({ mode: 'date', withTimezone: true })
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
};

export const entityTypeEnum = pgEnum('entity_type', ['EXPENSE', 'INCOME', 'BANK_ACCOUNT', 'BALANCE_SNAPSHOT']);

export const bankNameEnum = pgEnum('bank_name', ['BOURSORAMA', 'TRADE_REPUBLIC']);

export const bankAccount = createTable(
	'bank_account',
	d => ({
		id: d.uuid().notNull().primaryKey(),
		userId: d
			.uuid()
			.notNull()
			.references(() => user.id),
		name: bankNameEnum('bank_name').notNull(),
		iban: d.varchar({ length: 255 }).notNull(),
		bic: d.varchar({ length: 255 }).notNull(),
		...timestampFields,
	}),
	t => [index('bank_account_user_id_idx').on(t.userId), uniqueIndex('bank_account_iban_idx').on(t.iban)],
);

export const bankAccountRelations = relations(bankAccount, ({ one, many }) => ({
	user: one(user, { fields: [bankAccount.userId], references: [user.id] }),
	balanceSnapshots: many(balanceSnapshot),
	actions: many(action),
}));

export const balanceSnapshot = createTable(
	'balance_snapshot',
	d => ({
		id: d.uuid().notNull().primaryKey(),
		bankAccountId: d
			.uuid()
			.notNull()
			.references(() => bankAccount.id),
		balance: d.integer().notNull(),
		recordedAt: d
			.timestamp({ mode: 'date', withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
	}),
	t => [index('bank_account_balance_snapshot_bank_account_id_idx').on(t.bankAccountId)],
);

export const balanceSnapshotRelations = relations(balanceSnapshot, ({ one, many }) => ({
	bankAccount: one(bankAccount, { fields: [balanceSnapshot.bankAccountId], references: [bankAccount.id] }),
	actions: many(action),
}));

export const expense = createTable(
	'expense',
	d => ({
		id: d.uuid().notNull().primaryKey(),
		name: d.varchar({ length: 255 }),
		amount: d.integer().notNull(),
		type: expenseTypeEnum('expense_type').notNull(),
		bankAccountId: d
			.uuid()
			.notNull()
			.references(() => bankAccount.id),
		userId: d
			.uuid()
			.notNull()
			.references(() => user.id),
		...timestampFields,
	}),
	t => [index('expense_bank_account_id_idx').on(t.bankAccountId), index('expense_user_id_idx').on(t.userId)],
);

export const expenseRelations = relations(expense, ({ one, many }) => ({
	user: one(user, { fields: [expense.userId], references: [user.id] }),
	bankAccount: one(bankAccount, { fields: [expense.bankAccountId], references: [bankAccount.id] }),
	actions: many(action),
}));

export const income = createTable(
	'income',
	d => ({
		id: d.uuid().notNull().primaryKey(),
		name: d.varchar({ length: 255 }),
		amount: d.integer().notNull(),
		bankAccountId: d
			.uuid()
			.notNull()
			.references(() => bankAccount.id),
		userId: d
			.uuid()
			.notNull()
			.references(() => user.id),
		...timestampFields,
	}),
	t => [index('income_bank_account_id_idx').on(t.bankAccountId), index('income_user_id_idx').on(t.userId)],
);

export const incomeRelations = relations(income, ({ one, many }) => ({
	user: one(user, { fields: [income.userId], references: [user.id] }),
	bankAccount: one(bankAccount, { fields: [income.bankAccountId], references: [bankAccount.id] }),
	actions: many(action),
}));

export const action = createTable(
	'action',
	d => ({
		id: d
			.uuid()
			.notNull()
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		entityId: d.varchar({ length: 255 }).notNull(),
		entityType: entityTypeEnum('entity_type').notNull(),
		payload: d.text(),
		methodName: d.varchar({ length: 255 }).notNull(),
		origin: d.varchar({ length: 255 }).notNull(),
		success: d.boolean().notNull(),
		failureReason: d.text(),
		previousActionId: d.uuid(),
		userId: d.uuid().references(() => user.id),
		createdAt: d
			.timestamp({ mode: 'date', withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
	}),
	t => [
		index('action_user_id_idx').on(t.userId),
		index('action_previous_action_id_idx').on(t.previousActionId),
		index('action_entity_id_idx').on(t.entityId, t.entityType),
		index('action_method_name_idx').on(t.methodName),
	],
);

export const actionRelations = relations(action, ({ one }) => ({
	user: one(user, { fields: [action.userId], references: [user.id] }),
	previousAction: one(action, { fields: [action.previousActionId], references: [action.id] }),
}));

export const user = createTable('user', d => ({
	id: d
		.uuid()
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: d.varchar({ length: 255 }),
	email: d.varchar({ length: 255 }).notNull(),
	emailVerified: d
		.timestamp({
			mode: 'date',
			withTimezone: true,
		})
		.default(sql`CURRENT_TIMESTAMP`),
	image: d.varchar({ length: 255 }),
}));

export const userRelations = relations(user, ({ many }) => ({
	account: many(account),
	expenses: many(expense),
	incomes: many(income),
	actions: many(action),
	bankAccounts: many(bankAccount),
}));

export const account = createTable(
	'account',
	d => ({
		userId: d
			.uuid()
			.notNull()
			.references(() => user.id),
		type: d.varchar({ length: 255 }).$type<AdapterAccount['type']>().notNull(),
		provider: d.varchar({ length: 255 }).notNull(),
		providerAccountId: d.varchar({ length: 255 }).notNull(),
		refresh_token: d.text(),
		access_token: d.text(),
		expires_at: d.integer(),
		token_type: d.varchar({ length: 255 }),
		scope: d.varchar({ length: 255 }),
		id_token: d.text(),
		session_state: d.varchar({ length: 255 }),
	}),
	t => [primaryKey({ columns: [t.provider, t.providerAccountId] }), index('account_user_id_idx').on(t.userId)],
);

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const session = createTable(
	'session',
	d => ({
		sessionToken: d.varchar({ length: 255 }).notNull().primaryKey(),
		userId: d
			.uuid()
			.notNull()
			.references(() => user.id),
		expires: d.timestamp({ mode: 'date', withTimezone: true }).notNull(),
	}),
	t => [index('t_user_id_idx').on(t.userId)],
);

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const verificationToken = createTable(
	'verification_token',
	d => ({
		identifier: d.varchar({ length: 255 }).notNull(),
		token: d.varchar({ length: 255 }).notNull(),
		expires: d.timestamp({ mode: 'date', withTimezone: true }).notNull(),
	}),
	t => [primaryKey({ columns: [t.identifier, t.token] })],
);
