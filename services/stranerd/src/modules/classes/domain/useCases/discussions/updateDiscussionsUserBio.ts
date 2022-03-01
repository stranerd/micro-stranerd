import { BaseUseCase } from '@utils/commons'
import { IDiscussionRepository } from '../../irepositories/discussions'
import { UserBio, UserRoles } from '../../types'

type Input = { userId: string, userBio: UserBio, userRoles: UserRoles }

export class UpdateDiscussionsUserBioUseCase extends BaseUseCase<Input, boolean> {
	private repository: IDiscussionRepository

	constructor (repository: IDiscussionRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateDiscussionsUserBio(input.userId, input.userBio, input.userRoles)
	}
}
