import { IQuestionRepository } from '../../i-repositories/question'

export class DeleteQuestionUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.delete(id)
	}
}
