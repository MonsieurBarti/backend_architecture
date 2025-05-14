import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { ACTION_TOKENS } from '../action.tokens';
import { actionContainer } from '../action.container';
import type { ActionService } from '../application/action.service';

export const actionRouter = createTRPCRouter({
	findAll: protectedProcedure.query(async ({ ctx }) => {
		const actionService = actionContainer.get<ActionService>(ACTION_TOKENS.SERVICE);
		return actionService.findAllByUserId(ctx.session.user.id);
	}),
});
