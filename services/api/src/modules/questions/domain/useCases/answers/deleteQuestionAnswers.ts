import { IAnswerRepository } from '../../irepositories/answers'
import { BaseUseCase } from '@utils/commons'

export class DeleteQuestionAnswersUseCase extends BaseUseCase<string, boolean> {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		super()
		this.repository = repository
	}

	async execute (questionId: string) {
		return await this.repository.deleteQuestionAnswers(questionId)
	}
}
