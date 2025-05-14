export type EntityType = 'EXPENSE' | 'INCOME' | 'BANK_ACCOUNT' | 'BALANCE_SNAPSHOT' | 'USER';

export type Action = {
	id: string;
	entityId: string;
	entityType: EntityType;
	payload: string | null;
	methodName: string;
	origin: string;
	success: boolean;
	failureReason: string | null;
	previousActionId: string | null;
	userId: string | null;
	createdAt: Date;
};
