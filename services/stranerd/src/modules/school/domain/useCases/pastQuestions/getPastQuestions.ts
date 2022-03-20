import { IPastQuestionRepository } from '../../irepositories/pastQuestions'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { PastQuestionEntity } from '../../entities/pastQuestions'

export class GetPastQuestionsUseCase extends BaseUseCase<QueryParams, QueryResults<PastQuestionEntity>> {
	private repository: IPastQuestionRepository

	constructor (repository: IPastQuestionRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}
