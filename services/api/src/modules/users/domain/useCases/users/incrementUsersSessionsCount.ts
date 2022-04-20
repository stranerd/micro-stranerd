import { BaseUseCase } from '@utils/commons'
import { IUserRepository } from '../../i-repositories/users'
import { UserMeta } from '../../types'

type Input = { studentId: string, tutorId: string, value: 1 | -1 }

export class IncrementUsersSessionsCountUseCase implements BaseUseCase<Input, void> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (params: Input) {
		await Promise.all([
			this.repository.incrementUserMetaProperty(params.studentId, UserMeta.sessions, params.value),
			this.repository.incrementUserMetaProperty(params.tutorId, UserMeta.tutorSessions, params.value)
		])
	}
}