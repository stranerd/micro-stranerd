import { FirestoreGetClauses } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { IQuestionRepository } from '../../irepositories/iquestion'

export class GetQuestionsUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (date?: Date) {
		const conditions: FirestoreGetClauses = {
			order: { field: 'dates.createdAt', desc: true },
			limit: PAGINATION_LIMIT + 1
		}
		if (date) conditions.where = [{ field: 'dates.createdAt', condition: '<', value: date }]

		return await this.repository.get(conditions)
	}
}
