import { IAnswerRepository } from '../../irepositories/ianswer'

export class RateAnswerUseCase {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		this.repository = repository
	}

	async call (id: string, userId: string, rating: number) {
		return await this.repository.rate(id, userId, rating)
	}
}
