import { QuestionToModel } from 'src/modules/questions/data/models'
import { IQuestionRepository } from '../../i-repositories/question'


export class EditQuestionUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (id: string, data: Partial<QuestionToModel>) {
		return await this.repository.update(id,data)
	}
}
