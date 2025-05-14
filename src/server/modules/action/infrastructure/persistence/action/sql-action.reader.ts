import { injectable } from 'inversify';
import { db } from '@/server/db';
import { action } from '@/server/db/schema';
import type { Action } from '../../../domain/action/action';
import type { ActionReader } from '../../../domain/action/action.reader';
import { desc, eq } from 'drizzle-orm';

@injectable()
export class SqlActionReader implements ActionReader {
	async findAllByUserId(userId: string): Promise<Action[]> {
		return db.query.action.findMany({ where: eq(action.userId, userId), orderBy: [desc(action.createdAt)] });
	}

	async findAllByEntityId(entityId: string): Promise<Action[]> {
		return db.query.action.findMany({ where: eq(action.entityId, entityId), orderBy: [desc(action.createdAt)] });
	}
}
