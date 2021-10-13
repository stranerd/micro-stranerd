import { BaseUseCase } from '@utils/commons'
import { IUserRepository } from '../../i-repositories/users'

type Input = { studentId: string, sessionIds: string[], tutorId: string, add: boolean }

export class UpdateUserQueuedSessionsUseCase implements BaseUseCase<Input, void> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (params: Input) {
		return await this.repository.updateUserQueuedSessions(params.studentId, params.tutorId, params.sessionIds, params.add)
	}
}