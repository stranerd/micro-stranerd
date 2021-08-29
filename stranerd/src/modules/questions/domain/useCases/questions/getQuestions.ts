import { IQuestionRepository } from '../../irepositories/questions'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { QuestionEntity } from '../../entities'

export class GetQuestionsUseCase extends BaseUseCase<QueryParams, QueryResults<QuestionEntity>> {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		super()
		this.repository = repository
	}

	async execute (query) {
		return await this.repository.get(query)
	}
}