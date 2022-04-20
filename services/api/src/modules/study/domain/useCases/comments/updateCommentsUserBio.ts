import { BaseUseCase } from '@utils/commons'
import { UserBio, UserRoles } from '../../types'
import { ICommentRepository } from '../../irepositories/comments'

type Input = { userId: string, userBio: UserBio, userRoles: UserRoles }

export class UpdateCommentsUserBioUseCase extends BaseUseCase<Input, boolean> {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateCommentsUserBio(input.userId, input.userBio, input.userRoles)
	}
}
