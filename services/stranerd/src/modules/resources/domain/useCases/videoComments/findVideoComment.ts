import { IVideoCommentRepository } from '../../irepositories/videoComments'
import { BaseUseCase } from '@utils/commons'
import { VideoCommentEntity } from '../../entities/videoComments'

export class FindVideoCommentUseCase extends BaseUseCase<string, VideoCommentEntity | null> {
	private repository: IVideoCommentRepository

	constructor (repository: IVideoCommentRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.find(id)
	}
}
