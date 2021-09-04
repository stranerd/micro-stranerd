import { BaseUseCase } from '@utils/commons'
import { IUserRepository } from '../../i-repositories/users'

type Input = { studentId: string, tutorId: string, sessionId: string | null }

export class SetUsersCurrentSessionUseCase implements BaseUseCase<Input, void> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (params: Input) {
		return await this.repository.setUsersCurrentSession(params.studentId, params.tutorId, params.sessionId)
	}
}