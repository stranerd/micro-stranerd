import { IAnswerRepository } from '../../irepositories/answers'
import { BaseUseCase } from '@utils/commons'

type Input = { questionId: string, tags: string[] }

export class UpdateQuestionAnswersTagsUseCase extends BaseUseCase<Input, boolean> {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateQuestionAnswersTags(input.questionId, input.tags)
	}
}
