import { BaseUseCase } from '@utils/commons'
import { UserBio } from '../../types'
import { IVideoCommentRepository } from '../../irepositories/videoComments'

type Input = { userId: string, userBio: UserBio }

export class UpdateVideoCommentsUserBioUseCase extends BaseUseCase<Input, boolean> {
	private repository: IVideoCommentRepository

	constructor (repository: IVideoCommentRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateVideoCommentsUserBio(input.userId, input.userBio)
	}
}
