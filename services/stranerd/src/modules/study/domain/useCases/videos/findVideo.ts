import { IVideoRepository } from '../../irepositories/videos'
import { BaseUseCase } from '@utils/commons'
import { VideoEntity } from '../../../domain/entities/videos'

export class FindVideoUseCase extends BaseUseCase<string, VideoEntity | null> {
	private repository: IVideoRepository

	constructor (repository: IVideoRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.find(id)
	}
}
