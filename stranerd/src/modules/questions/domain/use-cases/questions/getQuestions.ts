import { GetClause } from '@utils/paginator'
import { IQuestionRepository } from '../../i-repositories/question'

export class GetQuestionsUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (conditions: GetClause) {
		return await this.repository.get(conditions)
	}
}
