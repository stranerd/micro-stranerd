import { ITagRepository } from '../../irepositories/tags'
import { BaseUseCase } from '@utils/commons'

type Input = { tagNames: string[], increment: boolean }

export class UpdateCountUseCase extends BaseUseCase<Input, boolean> {
	private repository: ITagRepository

	constructor (repository: ITagRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateTagsCount(input.tagNames, input.increment)
	}
}
