import { FirestoreGetClauses } from '@modules/core'
import { IQuestionRepository } from '../../irepositories/iquestion'
import { QuestionEntity } from '../../entities/question'

export class ListenToSimilarQuestionsUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (tags: string[], callback: (entities: QuestionEntity[]) => void) {
		const conditions: FirestoreGetClauses = {
			where: [
				{ field: 'tags', condition: 'array-contains-any', value: tags }
			],
			order: { field: 'dates.createdAt', desc: true },
			limit: 11
		}

		return await this.repository.listenToMany(callback, conditions)
	}
}
