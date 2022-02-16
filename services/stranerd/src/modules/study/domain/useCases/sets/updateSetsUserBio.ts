import { ISetRepository } from '../../irepositories/sets'
import { BaseUseCase } from '@utils/commons'
import { UserBio, UserRoles } from '../../types'

type Input = { userId: string, userBio: UserBio, userRoles: UserRoles }

export class UpdateSetsUserBioUseCase extends BaseUseCase<Input, boolean> {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateSetsUserBio(input.userId, input.userBio, input.userRoles)
	}
}
