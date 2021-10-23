import { IPastQuestionRepository } from '../../irepositories/pastQuestions'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { PastQuestionEntity } from '../../entities/pastQuestions'

export class GetPastQuestionsUseCase<Entity extends PastQuestionEntity> extends BaseUseCase<QueryParams, QueryResults<Entity>> {
	private repository: IPastQuestionRepository

	constructor (repository: IPastQuestionRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query) as QueryResults<Entity>
	}
}
