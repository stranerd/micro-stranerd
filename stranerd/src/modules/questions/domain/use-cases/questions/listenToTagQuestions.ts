import { FirestoreGetClauses } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { IQuestionRepository } from '../../irepositories/iquestion'
import { QuestionEntity } from '../../entities/question'

export class ListenToTagQuestionsUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (tag: string, callback: (entities: QuestionEntity[]) => void, date?: Date) {
		const conditions: FirestoreGetClauses = {
			order: { field: 'dates.createdAt', desc: true },
			limit: PAGINATION_LIMIT + 1,
			where: [
				{ field: 'tags', value: tag, condition: 'array-contains' }
			]
		}
		if (date) conditions.where!.push({ field: 'dates.createdAt', condition: '>=', value: date })

		return await this.repository.listenToMany(callback, conditions)
	}
}
