import { BaseUseCase } from '@utils/commons'
import { UserBio, UserRoles } from '../../types'
import { IClassRepository } from '../../irepositories/classes'

type Input = { userId: string, userBio: UserBio, userRoles: UserRoles }

export class UpdateClassesUserBioUseCase extends BaseUseCase<Input, boolean> {
	private repository: IClassRepository

	constructor (repository: IClassRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateClassesUserBio(input.userId, input.userBio, input.userRoles)
	}
}
