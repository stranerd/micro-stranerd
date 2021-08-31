import { IAnswerCommentRepository } from '../../irepositories/answerComments'
import { BaseUseCase } from '@utils/commons'

type Input = { answerId: string }

export class DeleteAnswersCommentsUseCase extends BaseUseCase<Input, boolean> {
	private repository: IAnswerCommentRepository

	constructor (repository: IAnswerCommentRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.deleteAnswerComments(input.answerId)
	}
}
