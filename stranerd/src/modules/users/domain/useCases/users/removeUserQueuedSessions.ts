import { BaseUseCase } from '@utils/commons'
import { IUserRepository } from '../../i-repositories/users'

type Input = { studentId: string, tutorId: string, sessionIds: string[] }

export class RemoveUserQueuedSessionsUseCase implements BaseUseCase<Input, void> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (params: Input) {
		return await this.repository.removeUserQueuedSessions(params.studentId, params.tutorId, params.sessionIds)
	}
}