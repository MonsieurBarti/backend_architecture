import type { Action } from './action';

export interface ActionRepository {
	save(action: Action): Promise<void>;
}
