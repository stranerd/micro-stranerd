import { FirestoreGetClauses } from '@modules/core'
import { IAnswerRepository } from '../../irepositories/ianswer'

export class GetUserAnswersUseCase {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		this.repository = repository
	}

	async call (userId: string, date?: Date) {
		const conditions: FirestoreGetClauses = {
			order: { field: 'dates.createdAt', desc: true },
			where: [
				{ field: 'userId', condition: '==', value: userId }
			]
		}
		if (date) conditions.where!.push({ field: 'dates.createdAt', condition: '<', value: date })

		return await this.repository.get(conditions)
	}
}
