import { BaseUseCase } from '@utils/commons'
import { IUserRepository } from '../../i-repositories/users'
import { UserSchoolData } from '../../types'

type Input = { userId: string, data: UserSchoolData }

export class UpdateUserSchoolDataUseCase implements BaseUseCase<Input, boolean> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (params: Input) {
		return await this.repository.updateUserSchoolData(params.userId, params.data)
	}
}