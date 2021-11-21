import { IVideoCommentRepository } from '../../irepositories/videoComments'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { VideoCommentEntity } from '../../entities/videoComments'

export class GetVideoCommentsUseCase extends BaseUseCase<QueryParams, QueryResults<VideoCommentEntity>> {
	private repository: IVideoCommentRepository

	constructor (repository: IVideoCommentRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}
