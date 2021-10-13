import { IVideoRepository } from '../../irepositories/videos'
import { BaseUseCase } from '@utils/commons'

type Input = { id: string, increment: boolean }

export class UpdateVideosCommentsCountUseCase extends BaseUseCase<Input, boolean> {
	private repository: IVideoRepository

	constructor (repository: IVideoRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateCommentsCount(input.id, input.increment)
	}
}
