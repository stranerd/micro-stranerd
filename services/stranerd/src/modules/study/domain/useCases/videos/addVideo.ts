import { VideoToModel } from '../../../data/models/videos'
import { IVideoRepository } from '../../irepositories/videos'
import { BaseUseCase } from '@utils/commons'
import { VideoEntity } from '../../entities/videos'

export class AddVideoUseCase extends BaseUseCase<VideoToModel, VideoEntity> {
	private repository: IVideoRepository

	constructor (repository: IVideoRepository) {
		super()
		this.repository = repository
	}

	async execute (data: VideoToModel) {
		return await this.repository.add(data)
	}
}
