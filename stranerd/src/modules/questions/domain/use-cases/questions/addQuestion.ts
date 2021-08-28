import { QuestionToModel } from 'src/modules/questions/data/models'
import { IQuestionRepository } from '../../i-repositories/question'

export class AddQuestionUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (data: QuestionToModel) {
		return await this.repository.add(data)
	}
}
