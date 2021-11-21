import { IVideoRepository } from '../../irepositories/videos'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { VideoEntity } from '../../entities/videos'

export class GetVideosUseCase extends BaseUseCase<QueryParams, QueryResults<VideoEntity>> {
	private repository: IVideoRepository

	constructor (repository: IVideoRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}
