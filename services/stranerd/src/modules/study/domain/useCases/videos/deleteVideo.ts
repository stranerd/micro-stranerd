import { IVideoRepository } from '../../irepositories/videos'
import { BaseUseCase } from '@utils/commons'

type Input = { id: string, userId: string }

export class DeleteVideoUseCase extends BaseUseCase<Input, boolean> {
	private repository: IVideoRepository

	constructor (repository: IVideoRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.delete(input.id, input.userId)
	}
}
