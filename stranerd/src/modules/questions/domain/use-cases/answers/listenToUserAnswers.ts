import { FirestoreGetClauses } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { IAnswerRepository } from '../../irepositories/ianswer'
import { AnswerEntity } from '../../entities/answer'

export class ListenToUserAnswersUseCase {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		this.repository = repository
	}

	async call (userId: string, callback: (entities: AnswerEntity[]) => void, date?: Date) {
		const conditions: FirestoreGetClauses = {
			order: { field: 'dates.createdAt', desc: true },
			limit: PAGINATION_LIMIT + 1,
			where: [
				{ field: 'userId', value: userId, condition: '==' }
			]
		}
		if (date) conditions.where!.push({ field: 'dates.createdAt', condition: '>=', value: date })

		return await this.repository.listenToMany(callback, conditions)
	}
}
