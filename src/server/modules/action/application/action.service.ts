import { inject, injectable } from 'inversify';
import type { Action } from '../domain/action/action';
import { ACTION_TOKENS } from '../action.tokens';
import type { ActionRepository } from '../domain/action/action.repository';
import type { ActionReader } from '../domain/action/action.reader';

@injectable()
export class ActionService {
	constructor(
		@inject(ACTION_TOKENS.REPOSITORY)
		private readonly actionRepository: ActionRepository,
		@inject(ACTION_TOKENS.READER)
		private readonly actionReader: ActionReader,
	) {}

	async save(actionEntity: Action): Promise<void> {
		await this.actionRepository.save(actionEntity);
	}

	async findAllByUserId(userId: string): Promise<Action[]> {
		return this.actionReader.findAllByUserId(userId);
	}
}
