import { z } from 'zod';

export const BalanceSnapshotProps = z.object({
	id: z.string().uuid().optional(),
	bankAccountId: z.string().uuid(),
	balance: z.number(),
	recordedAt: z.date().optional(),
});
export type BalanceSnapshotProps = z.infer<typeof BalanceSnapshotProps>;

export const BalanceSnapshotDto = z.object({
	id: z.string().uuid(),
	bankAccountId: z.string().uuid(),
	balance: z.number(),
	recordedAt: z.date(),
});
export type BalanceSnapshotDto = z.infer<typeof BalanceSnapshotDto>;

export class BalanceSnapshot {
	private readonly _id: string;
	private readonly _bankAccountId: string;
	private readonly _balance: number;
	private readonly _recordedAt: Date;

	private constructor(props: BalanceSnapshotProps) {
		this._id = props.id ?? crypto.randomUUID();
		this._bankAccountId = props.bankAccountId;
		this._balance = props.balance;
		this._recordedAt = props.recordedAt ?? new Date();
	}

	public static create(props: BalanceSnapshotProps): BalanceSnapshot {
		const validatedProps = BalanceSnapshotProps.parse(props);
		return new BalanceSnapshot(validatedProps);
	}

	public get id(): string {
		return this._id;
	}

	public get bankAccountId(): string {
		return this._bankAccountId;
	}

	public get balance(): number {
		return this._balance;
	}

	public get recordedAt(): Date {
		return this._recordedAt;
	}

	public dto(): BalanceSnapshotDto {
		return {
			id: this._id,
			bankAccountId: this._bankAccountId,
			balance: this._balance,
			recordedAt: this._recordedAt,
		};
	}
}
