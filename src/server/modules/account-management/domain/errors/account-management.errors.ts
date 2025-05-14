export class AccountManagementError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'AccountManagementError';
	}
}

export class BankAccountNotFoundError extends AccountManagementError {
	constructor(id: string, userId: string) {
		super(`Bank account ${id} not found for user ${userId}`);
		this.name = 'BankAccountNotFoundError';
	}
}
