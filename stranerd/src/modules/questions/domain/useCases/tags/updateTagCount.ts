import { ITagRepository } from '../../irepositories/tags'
import { BaseUseCase } from '@utils/commons'

type Input = { tagIds: string[], increment: boolean }

export class UpdateCountUseCase extends BaseUseCase<Input, boolean> {
	private repository: ITagRepository

	constructor (repository: ITagRepository) {
		super()
		this.repository = repository
	}

	async execute (input) {
		return await this.repository.updateTagsCount(input.tagIds, input.increment)
	}
}
