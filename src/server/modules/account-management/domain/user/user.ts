import { z } from 'zod';

export const UserProps = z.object({
	id: z.string().uuid(),
	email: z.string().email(),
	name: z.string(),
});
export type UserProps = z.infer<typeof UserProps>;

export class User {
	private readonly _id: string;
	private readonly _email: string;
	private readonly _name: string;

	private constructor(props: UserProps) {
		this._id = props.id;
		this._email = props.email;
		this._name = props.name;
	}

	public static create(props: UserProps): User {
		return new User(props);
	}

	public get id(): string {
		return this._id;
	}

	public get email(): string {
		return this._email;
	}

	public get name(): string {
		return this._name;
	}
}
