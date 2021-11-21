import { IVideoCommentRepository } from '../../irepositories/videoComments'
import { BaseUseCase } from '@utils/commons'

type Input = { videoId: string }

export class DeleteVideosCommentsUseCase extends BaseUseCase<Input, boolean> {
	private repository: IVideoCommentRepository

	constructor (repository: IVideoCommentRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.deleteVideoComments(input.videoId)
	}
}
