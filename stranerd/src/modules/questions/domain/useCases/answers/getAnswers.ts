import { IAnswerRepository } from '../../irepositories/answers'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { AnswerEntity } from '../../entities'

export class GetAnswersUseCase extends BaseUseCase<QueryParams, QueryResults<AnswerEntity>> {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}
