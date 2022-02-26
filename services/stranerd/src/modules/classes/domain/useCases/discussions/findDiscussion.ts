import { IDiscussionRepository } from '../../irepositories/discussions'
import { BaseUseCase } from '@utils/commons'
import { DiscussionEntity } from '../../entities/discussions'

export class FindDiscussionUseCase extends BaseUseCase<string, DiscussionEntity | null> {
	private repository: IDiscussionRepository

	constructor (repository: IDiscussionRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.find(id)
	}
}
