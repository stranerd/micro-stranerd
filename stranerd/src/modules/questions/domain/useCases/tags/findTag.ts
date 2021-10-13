import { ITagRepository } from '../../irepositories/tags'
import { BaseUseCase } from '@utils/commons'
import { TagEntity } from '../../entities/tags'

export class FindTagUseCase extends BaseUseCase<string, TagEntity | null> {
	private repository: ITagRepository

	constructor (repository: ITagRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.find(id)
	}
}
