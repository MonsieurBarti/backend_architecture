import { z } from 'zod';

export const BankName = z.enum(['BOURSORAMA', 'TRADE_REPUBLIC']);
export type BankName = z.infer<typeof BankName>;

export const BankAccountProps = z.object({
	id: z.string().uuid().optional(),
	userId: z.string().uuid(),
	name: BankName,
	iban: z.string(),
	bic: z.string(),
});
export type BankAccountProps = z.infer<typeof BankAccountProps>;

export class BankAccount {
	private readonly _id: string;
	private readonly _userId: string;
	private readonly _name: BankName;
	private readonly _iban: string;
	private readonly _bic: string;

	private constructor(props: BankAccountProps) {
		this._id = props.id ?? crypto.randomUUID();
		this._userId = props.userId;
		this._name = props.name;
		this._iban = props.iban;
		this._bic = props.bic;
	}

	public static create(props: BankAccountProps): BankAccount {
		const validatedProps = BankAccountProps.parse(props);
		return new BankAccount(validatedProps);
	}

	public get id(): string {
		return this._id;
	}

	public get userId(): string {
		return this._userId;
	}

	public get name(): BankName {
		return this._name;
	}

	public get iban(): string {
		return this._iban;
	}

	public get bic(): string {
		return this._bic;
	}

	public props(): BankAccountProps {
		return {
			id: this._id,
			userId: this._userId,
			name: this._name,
			iban: this._iban,
			bic: this._bic,
		};
	}
}
