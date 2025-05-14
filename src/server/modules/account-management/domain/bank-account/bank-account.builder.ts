import { faker } from '@faker-js/faker';
import { BankAccount } from './bank-account';
import type { BankName } from './bank-account';

export class BankAccountBuilder {
	private id: string = faker.string.uuid();
	private userId: string = faker.string.uuid();
	private name: BankName = 'BOURSORAMA';
	private iban: string = faker.finance.iban();
	private bic: string = faker.finance.bic();

	public withId(id: string): BankAccountBuilder {
		this.id = id;
		return this;
	}

	public withName(name: BankName): BankAccountBuilder {
		this.name = name;
		return this;
	}

	public withUserId(userId: string): BankAccountBuilder {
		this.userId = userId;
		return this;
	}

	public withIban(iban: string): BankAccountBuilder {
		this.iban = iban;
		return this;
	}

	public withBic(bic: string): BankAccountBuilder {
		this.bic = bic;
		return this;
	}

	public build(): BankAccount {
		return BankAccount.create({
			id: this.id,
			userId: this.userId,
			name: this.name,
			iban: this.iban,
			bic: this.bic,
		});
	}
}
