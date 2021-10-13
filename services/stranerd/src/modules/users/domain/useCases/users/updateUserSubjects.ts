import { BaseUseCase } from '@utils/commons'
import { IUserRepository } from '../../i-repositories/users'

type Input = { userId: string, strongestSubject: string, weakerSubjects: string[] }

export class UpdateUserSubjectsUseCase implements BaseUseCase<Input, boolean> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (params: Input) {
		return await this.repository.updateUserSubjects(params.userId, params.strongestSubject, params.weakerSubjects)
	}
}