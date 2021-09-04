import { BaseUseCase } from '@utils/commons'
import { IUserRepository } from '../../i-repositories/users'

type Input = { userId: string, tutorId: string, sessionId: string, type: 'requests' | 'lobby' }

export class AddUserQueuedSessionsUseCase implements BaseUseCase<Input, void> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (params: Input) {
		return await this.repository.addUserQueuedSessions(params.userId, params.sessionId, params.type === 'lobby')
	}
}