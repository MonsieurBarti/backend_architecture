import { injectable } from 'inversify';
import { db } from '@/server/db';
import { action } from '@/server/db/schema';
import type { Action } from '../../../domain/action/action';
import type { ActionRepository } from '../../../domain/action/action.repository';

@injectable()
export class SqlActionRepository implements ActionRepository {
	async save(actionEntity: Action): Promise<void> {
		await db.insert(action).values(actionEntity);
	}
}
