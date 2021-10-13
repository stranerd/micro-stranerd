import { IVideoCommentRepository } from '../../irepositories/videoComments'
import { VideoCommentToModel } from '../../../data/models/videoComments'
import { BaseUseCase } from '@utils/commons'
import { VideoCommentEntity } from '../../entities/videoComments'

export class AddVideoCommentUseCase extends BaseUseCase<VideoCommentToModel, VideoCommentEntity> {
	private repository: IVideoCommentRepository

	constructor (repository: IVideoCommentRepository) {
		super()
		this.repository = repository
	}

	async execute (data: VideoCommentToModel) {
		return await this.repository.add(data)
	}
}
