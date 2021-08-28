import { FirestoreGetClauses } from '@modules/core'
import { IQuestionRepository } from '../../irepositories/iquestion'

export class GetSimilarQuestionsUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (tags: string[]) {
		const conditions: FirestoreGetClauses = {
			where: [
				{ field: 'tags', condition: 'array-contains-any', value: tags }
			],
			order: { field: 'dates.createdAt', desc: true },
			limit: 11
		}

		return await this.repository.get(conditions)
	}
}
