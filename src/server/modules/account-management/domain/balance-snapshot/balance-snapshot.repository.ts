import type { BalanceSnapshot } from './balance-snapshot';

export interface BalanceSnapshotRepository {
	save(props: BalanceSnapshot): Promise<void>;
}
