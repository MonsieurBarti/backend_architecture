import 'reflect-metadata';

import { Container } from 'inversify';
import { ACTION_TOKENS } from './action.tokens';
import { SqlActionRepository } from './infrastructure/persistence/action/sql-action.repository';
import { SqlActionReader } from './infrastructure/persistence/action/sql-action.reader';
import { ActionService } from './application/action.service';

const actionContainer = new Container();

// Infrastructure bindings
actionContainer.bind(ACTION_TOKENS.REPOSITORY).to(SqlActionRepository).inSingletonScope();
actionContainer.bind(ACTION_TOKENS.READER).to(SqlActionReader).inSingletonScope();

// Application bindings
actionContainer.bind(ACTION_TOKENS.SERVICE).to(ActionService).inSingletonScope();

export { actionContainer };
