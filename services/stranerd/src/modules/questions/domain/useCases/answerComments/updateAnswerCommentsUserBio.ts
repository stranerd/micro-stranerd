import { BaseUseCase } from '@utils/commons'
import { UserBio, UserRoles } from '../../types'
import { IAnswerCommentRepository } from '../../irepositories/answerComments'

type Input = { userId: string, userBio: UserBio, userRoles: UserRoles }

export class UpdateAnswerCommentsUserBioUseCase extends BaseUseCase<Input, boolean> {
	private repository: IAnswerCommentRepository

	constructor (repository: IAnswerCommentRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateAnswerCommentsUserBio(input.userId, input.userBio, input.userRoles)
	}
}
