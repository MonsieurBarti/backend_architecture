import type { Action } from './action';

export interface ActionReader {
	findAllByUserId(userId: string): Promise<Action[]>;
	findAllByEntityId(entityId: string): Promise<Action[]>;
}
