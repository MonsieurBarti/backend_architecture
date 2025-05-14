import type { BalanceSnapshot } from './balance-snapshot';

export interface BalanceSnapshotReader {
	findById(id: string): Promise<BalanceSnapshot | null>;
	findLatestByBankAccountId(bankAccountId: string): Promise<BalanceSnapshot | null>;
	findLatestByUserIdGroupedByBankAccountId(userId: string): Promise<BalanceSnapshot[]>;
}
