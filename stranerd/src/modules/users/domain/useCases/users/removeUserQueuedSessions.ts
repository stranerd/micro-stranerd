import { BaseUseCase } from '@utils/commons'
import { IUserRepository } from '../../i-repositories/users'

type Input = { userId: string, tutorId: string, sessionIds: string[], type: 'requests' | 'lobby' }

export class RemoveUserQueuedSessionsUseCase implements BaseUseCase<Input, void> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (params: Input) {
		return await this.repository.removeUserQueuedSessions(params.userId, params.sessionIds, params.type === 'lobby')
	}
}