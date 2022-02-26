import { IDiscussionRepository } from '../../irepositories/discussions'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { DiscussionEntity } from '../../entities/discussions'

export class GetDiscussionsUseCase extends BaseUseCase<QueryParams, QueryResults<DiscussionEntity>> {
	private repository: IDiscussionRepository

	constructor (repository: IDiscussionRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}
