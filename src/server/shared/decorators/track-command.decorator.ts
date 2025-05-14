import { ACTION_TOKENS } from '../../modules/action/action.tokens';
import type { ActionService } from '../../modules/action/application/action.service';
import type { Action, EntityType } from '../../modules/action/domain/action/action';
import { actionContainer } from '@/server/modules/action/action.container';

/**
 * Decorator that tracks command execution by logging it using the ActionService
 *
 * @param entityType - The type of entity being operated on
 * @returns Method decorator for command handlers
 */
export function TrackCommand(entityType: EntityType) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;

		descriptor.value = async function (...args: any[]) {
			const command = args[0];
			const actionService = actionContainer.get<ActionService>(ACTION_TOKENS.SERVICE);

			const { userId, origin = 'SERVER' } = command.props;
			const methodName = `${target.constructor.name}.${propertyKey}`;
			const payload = JSON.stringify(command.props);

			let entityId: string | null = null;
			let result: any;
			let success = true;
			let failureReason: string | null = null;

			try {
				result = await originalMethod.apply(this, args);

				if (result && result.id) {
					entityId = result.id;
				} else if (command.props.id) {
					entityId = command.props.id;
				}

				return result;
			} catch (error) {
				success = false;
				failureReason = error instanceof Error ? error.message : String(error);
				throw error;
			} finally {
				const action: Action = {
					id: crypto.randomUUID(),
					entityId: entityId || 'unknown',
					entityType,
					payload,
					methodName,
					origin,
					success,
					failureReason,
					previousActionId: null,
					userId,
					createdAt: new Date(),
				};

				actionService.save(action).catch((error: any) => {
					console.error('Failed to save action:', error);
				});
			}
		};

		return descriptor;
	};
}
