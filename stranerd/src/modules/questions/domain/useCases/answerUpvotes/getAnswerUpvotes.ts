import { IAnswerUpvoteRepository } from '../../irepositories/answerUpvotes'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { AnswerUpvoteEntity } from '../../entities'

export class GetAnswerUpvotesUseCase extends BaseUseCase<QueryParams, QueryResults<AnswerUpvoteEntity>> {
	private repository: IAnswerUpvoteRepository

	constructor (repository: IAnswerUpvoteRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}