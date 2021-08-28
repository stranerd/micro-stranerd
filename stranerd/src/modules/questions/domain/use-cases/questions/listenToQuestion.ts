import { IQuestionRepository } from '../../irepositories/iquestion'
import { QuestionEntity } from '../../entities/question'

export class ListenToQuestionUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (id: string, callback: (entity: QuestionEntity | null) => void) {
		return await this.repository.listenToOne(id, callback)
	}
}
