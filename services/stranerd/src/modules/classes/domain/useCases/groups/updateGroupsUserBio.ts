import { BaseUseCase } from '@utils/commons'
import { UserBio, UserRoles } from '../../types'
import { IGroupRepository } from '../../irepositories/groups'

type Input = { userId: string, userBio: UserBio, userRoles: UserRoles }

export class UpdateGroupsUserBioUseCase extends BaseUseCase<Input, boolean> {
	private repository: IGroupRepository

	constructor (repository: IGroupRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateGroupsUserBio(input.userId, input.userBio, input.userRoles)
	}
}
