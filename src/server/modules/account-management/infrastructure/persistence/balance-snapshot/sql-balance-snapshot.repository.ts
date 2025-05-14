import { injectable } from 'inversify';
import { db } from '@/server/db';
import { balanceSnapshot } from '@/server/db/schema';
import type { BalanceSnapshot } from '../../../domain/balance-snapshot/balance-snapshot';
import type { BalanceSnapshotRepository } from '../../../domain/balance-snapshot/balance-snapshot.repository';

@injectable()
export class SqlBalanceSnapshotRepository implements BalanceSnapshotRepository {
	public async save(balanceSnapshotEntity: BalanceSnapshot): Promise<void> {
		await db.insert(balanceSnapshot).values(balanceSnapshotEntity);
	}
}
