import { BaseUseCase } from '@utils/commons'
import { IUserRepository } from '../../i-repositories/users'

type Input = { studentId: string, sessionId: string, tutorId: string }

export class AddUserQueuedSessionsUseCase implements BaseUseCase<Input, void> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (params: Input) {
		return await this.repository.addUserQueuedSessions(params.studentId, params.tutorId, params.sessionId)
	}
}