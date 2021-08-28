import { IAnswerRepository } from '../../i-repositories/answer'

export class MarkAsBestAnswerUseCase {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		this.repository = repository
	}

	async call (questionId: string, answerId: string) {
		return await this.repository.markAsBestAnswer(questionId, answerId)
	}
}
