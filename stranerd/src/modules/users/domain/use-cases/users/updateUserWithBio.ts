import { UseCase } from '@utils/commons'
import { IUserRepository } from '../../i-repositories/users'
import { UserBio } from '../../types/users'

type Input = { id: string, data: UserBio }

export class UpdateUserWithBioUseCase implements UseCase<Input, void> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (params: Input) {
		return await this.repository.createUserWithBio(params.id, params.data)
	}
}