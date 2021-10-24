import { VideoToModel } from '../../../data/models/videos'
import { IVideoRepository } from '../../irepositories/videos'
import { BaseUseCase } from '@utils/commons'
import { VideoEntity } from '../../entities/videos'
import { OmitUser } from '../../types'

type Input = { id: string, userId: string, data: OmitUser<VideoToModel> }

export class UpdateVideoUseCase extends BaseUseCase<Input, VideoEntity | null> {
	private repository: IVideoRepository

	constructor (repository: IVideoRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.update(input.id, input.userId, input.data)
	}
}
