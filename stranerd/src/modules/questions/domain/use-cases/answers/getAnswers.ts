import { IAnswerRepository } from '../../i-repositories/answer'
import { GetClause } from '@utils/base-types'

export class GetAnswersUseCase {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		this.repository = repository
	}

	async call (conditions: GetClause) {

		return await this.repository.get(conditions)
	}
}
